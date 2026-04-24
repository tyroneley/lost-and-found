import { Hono } from 'hono'
import {
  createClaimHandler,
  getClaimsHandler,
  updateClaimStatusHandler
} from '../controllers/claim.controller'

const claimRoutes = new Hono()

claimRoutes.post('/', createClaimHandler)
claimRoutes.get('/', getClaimsHandler)
claimRoutes.patch('/:id', updateClaimStatusHandler)
claimRoutes.delete('/:id', deleteClaimHandler)
export default claimRoutes