import { Hono } from 'hono'
import {
  createClaimHandler,
  deleteClaimHandler,
  getClaimsHandler,
  updateClaimStatusHandler
} from '../controllers/claim.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const claimRoutes = new Hono()

claimRoutes.use('/*', authMiddleware)
claimRoutes.post('/', createClaimHandler)
claimRoutes.get('/', getClaimsHandler)
claimRoutes.patch('/:id', requireRole(['SECURITY', 'ADMIN']), updateClaimStatusHandler)
claimRoutes.delete('/:id', requireRole(['ADMIN']), deleteClaimHandler)

export default claimRoutes
