import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
// import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'
import { AppRoutes } from './handler/handler'

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .get('/health', () => 'OK')
    .use(AppRoutes)
    .listen(3000)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
