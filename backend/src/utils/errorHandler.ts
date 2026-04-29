import { ZodError } from 'zod'

export const handleError = (c: any, error: any) => {
  if (error instanceof ZodError) {
    return c.json(
      {
        error: 'Validation failed',
        details: error.issues.map((e) => ({
          field: e.path[0],
          message: e.message
        }))
      },
      400
    )
  }

  if (error.code === 'P2002') {
    return c.json({ error: 'Duplicate field value' }, 400)
  }

  if (error.code === 'P2025') {
    return c.json({ error: 'Record not found' }, 404)
  }

  console.error(error)

  return c.json(
    {
      error: 'Internal server error'
    },
    500
  )
}