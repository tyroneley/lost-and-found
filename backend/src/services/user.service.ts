import { prisma } from '../lib/prisma'

export const createUser = async (data: any) => {
  return prisma.user.create({ data })
}

export const getUsers = async () => {
  return prisma.user.findMany()
}