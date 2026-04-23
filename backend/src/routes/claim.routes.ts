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

export default claimRoutes