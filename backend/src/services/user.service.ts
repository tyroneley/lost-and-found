import { randomBytes } from 'crypto'
import { prisma } from '../lib/prisma'
import * as bcrypt from 'bcryptjs'
import type { Prisma } from '../../generated/prisma'
import { sendTempPasswordEmail } from './email.service'
import { logUserAudit } from './audit.service'
import { AppError } from '../utils/errorHandler'

const userListSelect = {
  user_id: true,
  name: true,
  phone: true,
  personal_email: true,
  uni_email: true,
  role: true,
  affiliation: true,
  email_verified: true,
  must_change_password: true,
  created_at: true,
  deleted_at: true,
} as const

function generateTempPassword(): string {
  // 12 random hex chars — readable, hard enough to guess
  return randomBytes(6).toString('hex')
}

// Admin-created accounts: system generates temp password, user must change on first login
export const createUser = async (data: any) => {
  const existing = await prisma.user.findUnique({ where: { uni_email: data.uni_email } })
  if (existing) throw new AppError(409, 'A user with this university email already exists')

  const tempPassword = generateTempPassword()
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(tempPassword, salt)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      uni_email: data.uni_email,
      personal_email: data.personal_email ?? null,
      phone: data.phone ?? null,
      affiliation: data.affiliation ?? null,
      role: data.role ?? 'PUBLIC',
      password: hashedPassword,
      email_verified: true,       // admin vouches for the address
      must_change_password: true,
    },
    select: userListSelect,
  })

  sendTempPasswordEmail(
    { name: user.name, uni_email: user.uni_email! },
    tempPassword
  )

  return user
}

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { user_id: id } })
}

export const updateUser = async (id: string, data: any) => {
  return prisma.user.update({
    where: { user_id: id },
    data: {
      name: data.name,
      phone: data.phone,
      personal_email: data.personal_email,
      uni_email: data.uni_email,
      affiliation: data.affiliation,
      role: data.role,
    },
  })
}

export const getUsers = async (query?: any) => {
  const limit: number = query?.limit ?? 20
  const offset: number = query?.offset ?? 0
  const status: 'active' | 'deactivated' | 'all' = query?.status ?? 'active'

  const where: Prisma.UserWhereInput = {
    ...(status === 'active' ? { deleted_at: null } : {}),
    ...(status === 'deactivated' ? { deleted_at: { not: null } } : {}),
    ...(query?.role ? { role: query.role } : {}),
    ...(query?.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' } },
            { personal_email: { contains: query.q, mode: 'insensitive' } },
            { uni_email: { contains: query.q, mode: 'insensitive' } },
            { phone: { contains: query.q, mode: 'insensitive' } },
          ],
        }
      : {}),
  }

  const [total, data] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({ where, take: limit, skip: offset, select: userListSelect }),
  ])

  return { data, total, limit, offset }
}

export const setUserActiveStatus = async (
  id: string,
  active: boolean,
  changed_by: string,
  reason?: string
) => {
  const user = await prisma.user.findUnique({ where: { user_id: id } })
  if (!user) throw new AppError(404, 'User not found')

  if (id === changed_by) {
    throw new AppError(400, 'You cannot change the status of your own account')
  }

  const isCurrentlyActive = user.deleted_at === null
  if (active === isCurrentlyActive) {
    throw new AppError(400, active ? 'Account is already active' : 'Account is already deactivated')
  }

  if (!active && user.role === 'SUPERADMIN') {
    const activeSuperadmins = await prisma.user.count({
      where: { role: 'SUPERADMIN', deleted_at: null },
    })
    if (activeSuperadmins <= 1) {
      throw new AppError(400, 'Cannot deactivate the last active superadmin')
    }
  }

  const updated = await prisma.user.update({
    where: { user_id: id },
    data: { deleted_at: active ? null : new Date() },
    select: userListSelect,
  })

  await logUserAudit({
    target_user_id: id,
    changed_by,
    action: active ? 'REACTIVATE' : 'DEACTIVATE',
    notes: reason?.trim() || undefined,
  })

  return updated
}
