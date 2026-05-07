import { prisma } from '../lib/prisma'

export const createUser = async (data: any) => {
  return prisma.user.create({ data })
}

export const getUsers = async (query?: any) => {
  return prisma.user.findMany({
    where: {
      role: query?.role,

      OR: query?.q
        ? [
            { name: { contains: query.q, mode: 'insensitive' } },
            { personal_email: { contains: query.q, mode: 'insensitive' } },
            { uni_email: { contains: query.q, mode: 'insensitive' } }
          ]
        : undefined
    }
  })
}