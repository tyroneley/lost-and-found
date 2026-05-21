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
import type { AuthPayload } from '../middleware/auth'

export const createClaimHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const body = await c.req.json()
    const validated = createClaimSchema.parse(body)
    const claim = await createClaim({ ...validated, claimer_id: payload.sub })

    return c.json(claim, 201)
  } catch (error) {
    return handleError(c, error)
  }
}

export const getClaimsHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const query = claimQuerySchema.parse(c.req.query())

    if (payload.role === 'PUBLIC') {
      query.user_id = payload.sub
    }

    const claims = await getClaims(query)

    return c.json(claims)
  } catch (error) {
    return handleError(c, error)
  }
}

export const updateClaimStatusHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    const body = await c.req.json()
    const validated = updateClaimSchema.parse(body)
    const claim = await updateClaimStatus(params.id, validated, payload.sub)

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

// Specific approve handler - marks claim as approved
export const approveClaimHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    const claim = await updateClaimStatus(params.id, { status: 'APPROVED' }, payload.sub)

    return c.json(claim)
  } catch (error) {
    return handleError(c, error)
  }
}

// Specific reject handler - marks claim as rejected
export const rejectClaimHandler = async (c: any) => {
  try {
    const payload = c.get('jwtPayload') as AuthPayload
    const params = idParamSchema.parse({
      id: c.req.param('id')
    })

    const body = await c.req.json().catch(() => ({}))
    const claim = await updateClaimStatus(params.id, { status: 'REJECTED' }, payload.sub)

    return c.json(claim)
  } catch (error) {
    return handleError(c, error)
  }
}