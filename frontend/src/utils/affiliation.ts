import type { ApiUser } from '../services/api'

export const AFFILIATION_OPTIONS = ['Student', 'Staff', 'Visitor'] as const
export type AffiliationOption = (typeof AFFILIATION_OPTIONS)[number]

/** Map affiliation → default/restricted account role (admin user creation). */
export function roleForUserAffiliation(
  affiliation: string,
  currentRole?: ApiUser['role']
): ApiUser['role'] {
  if (affiliation === 'Staff') {
    return currentRole === 'SUPERADMIN' ? 'SUPERADMIN' : 'STAFF'
  }
  return 'PUBLIC'
}

export function allowedRolesForAffiliation(affiliation: string): ApiUser['role'][] {
  if (affiliation === 'Staff') return ['STAFF', 'SUPERADMIN']
  return ['PUBLIC']
}
