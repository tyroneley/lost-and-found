import { Hono } from 'hono'
import {
  createClaimHandler,
  deleteClaimHandler,
  getClaimsHandler,
  getClaimByIdHandler,
  updateClaimStatusHandler,
  approveClaimHandler,
  rejectClaimHandler
} from '../controllers/claim.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const claimRoutes = new Hono()

claimRoutes.use('/*', authMiddleware)
claimRoutes.post('/', createClaimHandler)
claimRoutes.get('/', getClaimsHandler)
claimRoutes.get('/:id', getClaimByIdHandler)
claimRoutes.patch('/:id/status', requireRole(['STAFF', 'SUPERADMIN']), updateClaimStatusHandler)
claimRoutes.patch('/:id', requireRole(['STAFF', 'SUPERADMIN']), updateClaimStatusHandler)
claimRoutes.post('/:id/approve', requireRole(['STAFF', 'SUPERADMIN']), approveClaimHandler)
claimRoutes.post('/:id/reject', requireRole(['STAFF', 'SUPERADMIN']), rejectClaimHandler)
claimRoutes.delete('/:id', requireRole(['SUPERADMIN']), deleteClaimHandler)

export default claimRoutes
