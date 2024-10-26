import { pgTable, integer, varchar, serial, foreignKey, numeric } from 'drizzle-orm/pg-core';
import { categories } from './categories.schema';
import { relations } from 'drizzle-orm';
import { orderDetails } from './orderDetails.schema';

export const products = pgTable(
	'products',
	{
		productId: serial('product_id').primaryKey().notNull(),
		productName: varchar('product_name', { length: 255 }),
		categoryId: integer('category_id'),
		unit: varchar({ length: 255 }),
		price: numeric({ precision: 10, scale: 2 }),
	},
	(table) => {
		return {
			productsCategoryIdFkey: foreignKey({
				columns: [table.categoryId],
				foreignColumns: [categories.categoryId],
				name: 'products_category_id_fkey',
			}),
		};
	},
);
export const productsRelations = relations(products, ({ one, many }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.categoryId],
	}),
	orderDetails: many(orderDetails),
}));
