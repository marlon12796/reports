import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const categories = pgTable('categories', {
	categoryId: serial('category_id').primaryKey().notNull(),
	categoryName: varchar('category_name', { length: 255 }),
	description: varchar({ length: 255 }),
});
