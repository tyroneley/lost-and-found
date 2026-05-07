import { prisma } from '../lib/prisma'
import type { Prisma } from '../../generated/prisma'

export const createUser = async (data: any) => {
  return prisma.user.create({ data })
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
    role: query?.role,
    OR: query?.q
      ? [
          { name: { contains: query.q, mode: 'insensitive' } },
          { personal_email: { contains: query.q, mode: 'insensitive' } },
          { uni_email: { contains: query.q, mode: 'insensitive' } }
        ]
      : undefined
  }

  const [total, data] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({ where, take: limit, skip: offset })
  ])

  return { data, total, limit, offset }
}