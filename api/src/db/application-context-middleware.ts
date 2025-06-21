import { container, DependencyContainer } from 'tsyringe';
import type { Context, MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { ApplicationStorage } from '../model/application-storage';
import { TenantManagementStore } from '../model/tenant-management-store';

export const applicationCxt = 'applicationContext';

export async function containerBuilderAsync(
  env: any
): Promise<DependencyContainer> {
  container.register<TenantManagementStore>(TenantManagementStore, {
    useValue: new TenantManagementStore(env.HYPERDRIVE.connectionString)
  });
  container.register<ApplicationStorage>(ApplicationStorage, {
    useValue: new ApplicationStorage(env.HYPERDRIVE.connectionString)
  });
  return container;
}

export const applicationContextMiddleware = (): MiddlewareHandler =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMiddleware(async (ctx: Context, next: any) => {
    if (!ctx.get(applicationCxt)) {
      const container = await containerBuilderAsync(ctx.env);
      ctx.set(applicationCxt, container);
    }
    await next();
  });
