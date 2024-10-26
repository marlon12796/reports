import { pgTable, integer, date, serial, foreignKey } from 'drizzle-orm/pg-core';
import { customers } from './customers.schema';
import { relations } from 'drizzle-orm';
import { orderDetails } from './orderDetails.schema';

export const orders = pgTable(
	'orders',
	{
		orderId: serial('order_id').primaryKey().notNull(),
		customerId: integer('customer_id'),
		orderDate: date('order_date'),
	},
	(table) => {
		return {
			ordersCustomerIdFkey: foreignKey({
				columns: [table.customerId],
				foreignColumns: [customers.customerId],
				name: 'orders_customer_id_fkey',
			}),
		};
	},
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
	customer: one(customers, {
		fields: [orders.customerId],
		references: [customers.customerId],
	}),
	orderDetails: many(orderDetails),
}));
