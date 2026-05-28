import { prisma } from '../lib/prisma'
import { AppError } from '../utils/errorHandler'

export const createCategory = async (data: any) => {
  return prisma.category.create({ data })
}

export const getCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: 'asc' } })
}

export const updateCategory = async (id: string, data: any) => {
  const existing = await prisma.category.findUnique({ where: { category_id: id } })
  if (!existing) throw new AppError(404, 'Category not found')
  return prisma.category.update({ where: { category_id: id }, data })
}

export const deleteCategory = async (id: string) => {
  const existing = await prisma.category.findUnique({ where: { category_id: id } })
  if (!existing) throw new AppError(404, 'Category not found')
  const itemCount = await prisma.item.count({ where: { category_id: id, deleted_at: null } })
  if (itemCount > 0) throw new AppError(400, `Cannot delete: ${itemCount} active item(s) use this category`)
  return prisma.category.delete({ where: { category_id: id } })
}