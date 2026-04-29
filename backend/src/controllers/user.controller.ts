import { createUser, getUsers } from '../services/user.service'
import { createUserSchema } from '../validators/user.validator'
import { handleError } from '../utils/errorHandler'

export const createUserHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const validated = createUserSchema.parse(body)
    const user = await createUser(validated)

    return c.json(user, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getUsersHandler = async (c: any) => {
  try {
    const users = await getUsers()
    return c.json(users)
  } catch (error) {
    return handleError(c, error)
  }
}