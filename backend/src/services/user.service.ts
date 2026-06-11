import { prisma } from '../lib/prisma'
import * as bcrypt from 'bcryptjs'
import type { Prisma } from '../../generated/prisma'
import { sendWelcomeEmail } from './email.service'

export const createUser = async (data: any) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(data.password, salt)

  const { password, ...rest } = data
  const user = await prisma.user.create({
    data: { ...rest, password: hashedPassword, role: data.role ?? 'PUBLIC' },
  })

  const { password: _, ...safeUser } = user
  sendWelcomeEmail(safeUser)
  return safeUser
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
      role: data.role
    }
  })
}

export const getUsers = async (query?: any) => {
  const limit: number = query?.limit ?? 20
  const offset: number = query?.offset ?? 0

  const where: Prisma.UserWhereInput = {
    deleted_at: null,
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

  const userSelect = {
    user_id: true,
    name: true,
    phone: true,
    personal_email: true,
    uni_email: true,
    role: true,
    affiliation: true,
    created_at: true,
  } as const

  const [total, data] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({ where, take: limit, skip: offset, select: userSelect }),
  ])

  return { data, total, limit, offset }
}