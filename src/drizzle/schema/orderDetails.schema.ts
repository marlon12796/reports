import { pgTable, integer, serial, foreignKey } from 'drizzle-orm/pg-core';
import { orders } from './orders.schema';
import { products } from './products.schema';
import { relations } from 'drizzle-orm';
export const orderDetails = pgTable(
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
				foreignColumns: [orders.orderId],
				name: 'order_details_order_id_fkey',
			}),
			orderDetailsProductIdFkey: foreignKey({
				columns: [table.productId],
				foreignColumns: [products.productId],
				name: 'order_details_product_id_fkey',
			}),
		};
	},
);
export const orderDetailsRelations = relations(orderDetails, ({ one }) => ({
	order: one(orders, {
		fields: [orderDetails.orderId],
		references: [orders.orderId],
	}),
	product: one(products, {
		fields: [orderDetails.productId],
		references: [products.productId],
	}),
}));