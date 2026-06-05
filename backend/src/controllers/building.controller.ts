import {
  getBuildings,
  createBuilding,
  updateBuilding,
  deleteBuilding,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../services/building.service'
import { getBuildingUsage, getRoomUsage } from '../services/reference-usage.service'
import { handleError } from '../utils/errorHandler'

export const getBuildingsHandler = async (c: any) => {
  try {
    const buildings = await getBuildings()
    return c.json(buildings)
  } catch (error) {
    return handleError(c, error)
  }
}

export const createBuildingHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const building = await createBuilding(body)
    return c.json(building, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const updateBuildingHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const building = await updateBuilding(id, body)
    return c.json(building)
  } catch (error) {
    return handleError(c, error)
  }
}

export const deleteBuildingHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    await deleteBuilding(id)
    return c.json({ success: true })
  } catch (error) {
    return handleError(c, error)
  }
}

export const createRoomHandler = async (c: any) => {
  try {
    const buildingId = c.req.param('buildingId')
    const body = await c.req.json()
    const room = await createRoom(buildingId, body)
    return c.json(room, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const updateRoomHandler = async (c: any) => {
  try {
    const roomId = c.req.param('roomId')
    const body = await c.req.json()
    const room = await updateRoom(roomId, body)
    return c.json(room)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getBuildingUsageHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    const usage = await getBuildingUsage(id)
    return c.json(usage)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getRoomUsageHandler = async (c: any) => {
  try {
    const roomId = c.req.param('roomId')
    const usage = await getRoomUsage(roomId)
    return c.json(usage)
  } catch (error) {
    return handleError(c, error)
  }
}

export const deleteRoomHandler = async (c: any) => {
  try {
    const roomId = c.req.param('roomId')
    await deleteRoom(roomId)
    return c.json({ success: true })
  } catch (error) {
    return handleError(c, error)
  }
}
