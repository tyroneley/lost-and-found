/** Shared max lengths for form fields — keep in sync with backend validators. */
export const FIELD_LIMITS = {
  USER_NAME: 100,
  USER_FIRST_NAME: 50,
  USER_LAST_NAME: 50,
  EMAIL: 254,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  PHONE: 20,
  BINUS_ID: 30,
  AFFILIATION: 50,

  ITEM_NAME: 80,
  ITEM_DESCRIPTION: 300,
  FINDER_NAME: 60,
  FINDER_CONTACT: 80,

  OWNERSHIP_DESC: 300,
  STAFF_NOTES: 300,

  CATEGORY_NAME: 60,
  CATEGORY_DESCRIPTION: 300,
  BUILDING_NAME: 100,
  BUILDING_ADDRESS: 300,
  ROOM_NAME: 80,
  ROOM_NUMBER_MAX: 999999,

  SEARCH: 100,
  ROOM_FILTER: 10,
} as const

/** Hard cap in onChange — HTML maxLength alone is unreliable on controlled React inputs (paste). */
export function clampField(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max)
}
