import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import itemRoutes from './routes/item.routes'

const app = new Hono()

app.get('/', (c) => c.text('running'))

app.route('/items', itemRoutes)

serve({
  fetch: app.fetch,
  port: 3001
})