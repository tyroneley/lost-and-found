import { prisma } from '../lib/prisma'

export const getBuildings = async () => {
  return prisma.building.findMany()
}

export const getBuildingByName = async (name: string) => {
  return prisma.building.findUnique({
    where: { name }
  })
}

export const getCategoryByName = async (name: string) => {
  return prisma.category.findUnique({
    where: { name }
  })
}
