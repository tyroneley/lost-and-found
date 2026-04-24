import { createUser, getUsers } from '../services/user.service'

export const createUserHandler = async (c: any) => {
  const body = await c.req.json()
  const user = await createUser(body)
  return c.json(user, 201)
}

export const getUsersHandler = async (c: any) => {
  const users = await getUsers()
  return c.json(users)
}