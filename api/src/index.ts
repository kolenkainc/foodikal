import 'reflect-metadata';
import { withSentry } from '@sentry/cloudflare';
import { sentry } from '@hono/sentry';
import { Context, type Env, Hono } from 'hono';
import { logger as loggerMiddleware } from 'hono/logger';
import { applicationContextMiddleware, containerBuilderAsync } from './application-context-middleware';
import { elasticsearchLogsMiddleware } from './elasticsearch-logs-middleware';
import warehouse from './controllers/warehouse-controller';
import movement from './controllers/movement-controller';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors';
import { MovementService } from './services/movement-service';

const app = new Hono<{ Bindings: Env }>();
app.use(
  sentry(),
  loggerMiddleware(),
  applicationContextMiddleware(),
  elasticsearchLogsMiddleware()
);
app.use(
  '/*',
  cors({
    origin: (origin, _: Context) => {
      return origin.endsWith('inventory.romashov.tech') ||
        origin.endsWith('m.inventory.romashov.tech') ||
        origin.endsWith('inventory-mobile.pages.dev') ||
        origin.endsWith('inventory-web-csm.pages.dev')
        ? origin
        : 'http://localhost:5173';
    }
  })
);

app.get('/healthcheck', async (c: Context) => {
  console.log('Hello world from Cloudflare and ElasticSearch');
  return c.json('ok');
});

app.route('/warehouse', warehouse);
app.route('/movement', movement);

// Middleware to handle error logging
app.get('/error', async () => {
  throw Error('Expected error');
});

app.get('/', swaggerUI({ url: '/swagger.yml' }));

app.get('*', (c: Context) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scheduledAsync = async (_: ScheduledController, env: any, __: ExecutionContext,) => {
  const container = await containerBuilderAsync(env);
  const service = container.resolve(MovementService);
  await service.closeCurrentMovementAsync();
}

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
    scheduled: scheduledAsync,
  } satisfies ExportedHandler<Env>
);
