import { createUser, getUsers } from '../services/user.service'
import { createUserSchema } from '../validators/user.validator'
import { handleError } from '../utils/errorHandler'
import { userQuerySchema } from '../validators/common.validator'

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
    const query = userQuerySchema.parse(c.req.query())
    const users = await getUsers(query)

    return c.json(users)
  } catch (error) {
    return handleError(c, error)
  }
}