import 'reflect-metadata';
import { withSentry } from '@sentry/cloudflare';
import { sentry } from '@hono/sentry';
import { Context, type Env, Hono } from 'hono';
import { logger as loggerMiddleware } from 'hono/logger';
import { applicationContextMiddleware } from './application-context-middleware';

const app = new Hono<{ Bindings: Env }>();
app.use(
  sentry(),
  loggerMiddleware(),
  applicationContextMiddleware(),
);
app.use('/*');

app.get('/healthcheck', async (c: Context) => {
  console.log('Hello world from Cloudflare');
  return c.json('ok');
});

// Middleware to handle error logging
app.get('/error', async () => {
  throw Error('Expected error');
});

app.get('*', (c: Context) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default withSentry(
  //@ts-expect-error it should be here
  (env: Env) => {
    return {
      dsn: 'https://9b631feb01da428b471ac1cbd160173f@o164625.ingest.us.sentry.io/4509063427653632',
      // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
      tracesSampleRate: 1.0,
    };
  },
  {
    fetch: app.fetch,
  } satisfies ExportedHandler<Env>
);
