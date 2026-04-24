import { Hono } from 'hono'
import { serve } from '@hono/node-server'

import itemRoutes from './routes/item.routes'
import claimRoutes from './routes/claim.routes'
import categoryRoutes from './routes/category.routes'
import userRoutes from './routes/user.routes'

const app = new Hono()

app.get('/', (c) => c.text('API running'))

app.route('/items', itemRoutes)
app.route('/claims', claimRoutes)
app.route('/categories', categoryRoutes)
app.route('/users', userRoutes)

serve({
  fetch: app.fetch,
  port: 3001
})