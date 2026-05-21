import { getBuildings } from '../services/building.service'
import { handleError } from '../utils/errorHandler'

export const getBuildingsHandler = async (c: any) => {
  try {
    const buildings = await getBuildings()
    return c.json(buildings)
  } catch (error) {
    return handleError(c, error)
  }
}
