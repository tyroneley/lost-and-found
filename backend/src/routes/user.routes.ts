import { Hono } from 'hono'
import { createUserHandler, getUsersHandler } from '../controllers/user.controller'

const userRoutes = new Hono()

userRoutes.post('/', createUserHandler)
userRoutes.get('/', getUsersHandler)

export default userRoutes