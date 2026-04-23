import {
  createClaim,
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

export const getClaimsHandler = async () => {
  const claims = await getClaims()
  return new Response(JSON.stringify(claims))
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