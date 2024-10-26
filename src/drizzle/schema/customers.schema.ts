import { relations } from 'drizzle-orm';
import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';
import { orders } from './orders.schema';
export const customers = pgTable('customers', {
	customerId: serial('customer_id').primaryKey().notNull(),
	customerName: varchar('customer_name', { length: 255 }),
	contactName: varchar('contact_name', { length: 255 }),
	address: varchar({ length: 255 }),
	city: varchar({ length: 255 }),
	postalCode: varchar('postal_code', { length: 255 }),
	country: varchar({ length: 255 }),
});

export const customersRelations = relations(customers, ({ many }) => ({
	orders: many(orders),
}));
