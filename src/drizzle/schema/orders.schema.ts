import { pgTable, integer, date, serial, foreignKey } from 'drizzle-orm/pg-core';
import { Customers } from './customers.schema';
import { InferSelectModel, relations } from 'drizzle-orm';
import { OrderDetails } from './orderDetails.schema';

export const Orders = pgTable(
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
				foreignColumns: [Customers.customerId],
				name: 'orders_customer_id_fkey',
			}),
		};
	},
);

export const ordersRelations = relations(Orders, ({ one, many }) => ({
	customer: one(Customers, {
		fields: [Orders.customerId],
		references: [Customers.customerId],
	}),
	orderDetails: many(OrderDetails),
}));
export type OrderType = InferSelectModel<typeof Orders>;
