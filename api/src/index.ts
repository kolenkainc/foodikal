import 'reflect-metadata';
import { withSentry } from '@sentry/cloudflare';
import { sentry } from '@hono/sentry';
import { Context, Hono } from 'hono';
import { contextStorage, getContext } from 'hono/context-storage';
import { logger as loggerMiddleware } from 'hono/logger';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { createHub } from 'honohub';
import { getHub } from '../hub.config';

const app = new Hono<{ Bindings: Env }>();
app.use(sentry(), loggerMiddleware(), contextStorage());
app.use(
  '/*',
  cors({
    origin: (origin, _: Context) => {
      return origin.endsWith('foodikal.romashov.tech') ||
        origin.endsWith('m.foodikal.romashov.tech')
        ? origin
        : 'http://localhost:5173';
    }
  })
);

app.get('/healthcheck', async (c: Context) => {
  console.log('Hello world from Cloudflare and ElasticSearch');
  return c.json('ok');
});

app.route(
  '/hub',
  // createHub(getHub((getContext().env as any).HYPERDRIVE.connectionString))
  createHub(
    getHub(
      // String(process.env.WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE)
      'postgres://foodikal-user:KqCQzyH2akGB9gQ4@localhost:5432/foodikal-production'
    )
  )
);

app.get('/swagger', swaggerUI({ url: '/swagger.yml' }));

app.get('*', (c: Context) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default withSentry(
  //@ts-expect-error it should be here
  (env: Env) => {
    return {
      dsn: 'https://9b631feb01da428b471ac1cbd160173f@o164625.ingest.us.sentry.io/4509063427653632',
      // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
      tracesSampleRate: 1.0
    };
  },
  {
    fetch: app.fetch
  } satisfies ExportedHandler<Env>
);
