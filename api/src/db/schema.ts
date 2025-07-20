import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  integer
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  address: text('address').notNull(),
  name: text('name').notNull()
});

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders)
}));

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  subTotal: integer('sub_total').notNull().default(0),
  customerId: integer('customer_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id]
  }),
  orderMeals: many(orderMeals)
}));

export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull()
});

export const mealsRelations = relations(meals, ({ many }) => ({
  orderMeals: many(orderMeals)
}));

export const orderMeals = pgTable('order_meals', {
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id),
  mealId: integer('meal_id')
    .notNull()
    .references(() => meals.id),
  quantity: integer('quantity').notNull().default(1)
});

export const orderMealsRelations = relations(orderMeals, ({ one }) => ({
  order: one(orders, {
    fields: [orderMeals.orderId],
    references: [orders.id]
  }),
  meal: one(meals, {
    fields: [orderMeals.mealId],
    references: [meals.id]
  })
}));
