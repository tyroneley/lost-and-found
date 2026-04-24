import {
  createClaim,
  deleteClaim,
  getClaims,
  updateClaimStatus
} from '../services/claim.service'

export const createClaimHandler = async (c: any) => {
  try {
    const body = await c.req.json()
    const claim = await createClaim(body)
    return c.json(claim, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create claim' }, 500)
  }
}

export const getClaimsHandler = async (c: any) => {
  const query = c.req.query()
  const claims = await getClaims(query)
  return c.json(claims)
}

export const deleteClaimHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    await deleteClaim(id)
    return c.json({ message: 'Claim deleted' })
  } catch {
    return c.json({ error: 'Failed to delete claim' }, 500)
  }
}

export const updateClaimStatusHandler = async (c: any) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const claim = await updateClaimStatus(id, body)
    return c.json(claim)
  } catch {
    return c.json({ error: 'Failed to update claim' }, 500)
  }
}