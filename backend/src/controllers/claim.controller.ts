import {
  createClaim,
  getClaims,
  updateClaimStatus,
  deleteClaim
} from '../services/claim.service'

import {
  createClaimSchema,
  updateClaimSchema
} from '../validators/claim.validator'

import { handleError } from '../utils/errorHandler'
import { claimQuerySchema, idParamSchema } from '../validators/common.validator'

export const createClaimHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const validated = createClaimSchema.parse(body)
    const claim = await createClaim(validated)

    return c.json(claim, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getClaimsHandler = async (c: any) => {
  try {
    const query = claimQuerySchema.parse(c.req.query())
    const claims = await getClaims(query)

    return c.json(claims)
  } catch (error) {
    return handleError(c, error)
  }
}

export const updateClaimStatusHandler = async (c: any) => {
  try {
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    const body = await c.req.json()
    const validated = updateClaimSchema.parse(body)
    const claim = await updateClaimStatus(params.id, validated)

    return c.json(claim)
  } catch (error) {
    return handleError(c, error)
  }
}

export const deleteClaimHandler = async (c: any) => {
  try {
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    await deleteClaim(params.id)

    return c.json({ message: 'Claim deleted' })
  } catch (error) {
    return handleError(c, error)
  }
}