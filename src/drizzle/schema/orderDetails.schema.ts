import { pgTable, integer, serial, foreignKey } from 'drizzle-orm/pg-core';

import { InferSelectModel, relations } from 'drizzle-orm';
import { Orders, Products } from './schema';
export const OrderDetails = pgTable(
	'order_details',
	{
		orderDetailId: serial('order_detail_id').primaryKey().notNull(),
		orderId: integer('order_id'),
		productId: integer('product_id'),
		quantity: integer(),
	},
	(table) => {
		return {
			orderDetailsOrderIdFkey: foreignKey({
				columns: [table.orderId],
				foreignColumns: [Orders.orderId],
				name: 'order_details_order_id_fkey',
			}),
			orderDetailsProductIdFkey: foreignKey({
				columns: [table.productId],
				foreignColumns: [Products.productId],
				name: 'order_details_product_id_fkey',
			}),
		};
	},
);
export const orderDetailsRelations = relations(OrderDetails, ({ one }) => ({
	order: one(Orders, {
		fields: [OrderDetails.orderId],
		references: [Orders.orderId],
	}),
	product: one(Products, {
		fields: [OrderDetails.productId],
		references: [Products.productId],
	}),
}));
export type OrderDetailsType = InferSelectModel<typeof OrderDetails>;
