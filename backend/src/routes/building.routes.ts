import { Hono } from 'hono'
import {
  getBuildingsHandler,
  createBuildingHandler,
  updateBuildingHandler,
  deleteBuildingHandler,
  createRoomHandler,
  updateRoomHandler,
  deleteRoomHandler,
} from '../controllers/building.controller'
import { authMiddleware, requireRole } from '../middleware/auth'

const buildingRoutes = new Hono()

buildingRoutes.get('/', getBuildingsHandler)
buildingRoutes.use('/*', authMiddleware)
buildingRoutes.post('/', requireRole(['STAFF', 'SUPERADMIN']), createBuildingHandler)
// More specific /rooms/* routes before the generic /:id routes
buildingRoutes.put('/rooms/:roomId', requireRole(['STAFF', 'SUPERADMIN']), updateRoomHandler)
buildingRoutes.delete('/rooms/:roomId', requireRole(['SUPERADMIN']), deleteRoomHandler)
buildingRoutes.put('/:id', requireRole(['STAFF', 'SUPERADMIN']), updateBuildingHandler)
buildingRoutes.delete('/:id', requireRole(['SUPERADMIN']), deleteBuildingHandler)
buildingRoutes.post('/:buildingId/rooms', requireRole(['STAFF', 'SUPERADMIN']), createRoomHandler)

export default buildingRoutes
