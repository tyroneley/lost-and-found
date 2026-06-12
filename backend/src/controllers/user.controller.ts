import { createUser, getUsers, getUserById, updateUser, setUserActiveStatus } from '../services/user.service'
import { createUserSchema, setUserActiveSchema, updateUserSchema } from '../validators/user.validator'
import { handleError } from '../utils/errorHandler'
import { idParamSchema, userQuerySchema } from '../validators/common.validator'
import type { AuthPayload } from '../middleware/auth'

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

export const getUserByIdHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({ id: c.req.param('id') })

    if (payload.role === 'PUBLIC' && params.id !== payload.sub) {
      return c.json({ error: 'Forbidden' }, 403)
    }

    const user = await getUserById(params.id)
    if (!user) return c.json({ error: 'User not found' }, 404)

    return c.json(user)
  } catch (error) {
    return handleError(c, error)
  }
}

export const updateUserHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({ id: c.req.param('id') })

    const isSelf = params.id === payload.sub
    const isAdmin = payload.role === 'SUPERADMIN'

    if (!isSelf && !isAdmin) {
      return c.json({ error: 'Forbidden' }, 403)
    }

    const body = await c.req.json()
    const { role, ...profileFields } = updateUserSchema.parse(body)

    const user = await updateUser(params.id, isAdmin ? { role, ...profileFields } : profileFields)

    return c.json(user)
  } catch (error) {
    return handleError(c, error)
  }
}

export const deactivateUserHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({ id: c.req.param('id') })
    const body = await c.req.json().catch(() => ({}))
    const { reason } = setUserActiveSchema.parse(body)
    const user = await setUserActiveStatus(params.id, false, payload.sub, reason)
    return c.json(user)
  } catch (error) {
    return handleError(c, error)
  }
}

export const reactivateUserHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({ id: c.req.param('id') })
    const body = await c.req.json().catch(() => ({}))
    const { reason } = setUserActiveSchema.parse(body)
    const user = await setUserActiveStatus(params.id, true, payload.sub, reason)
    return c.json(user)
  } catch (error) {
    return handleError(c, error)
  }
}
