import { prisma } from '../lib/prisma'

export const createCategory = async (data: any) => {
  return prisma.category.create({ data })
}

export const getCategories = async () => {
  return prisma.category.findMany()
}