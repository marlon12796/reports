import { InferSelectModel } from 'drizzle-orm';
import { integer, pgTable, varchar, text, smallint } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';

export const continentEnum = pgEnum('continent_enum', [
	'Asia',
	'Africa',
	'Europe',
	'North America',
	'South America',
	'Australia (Oceania)',
]);
export const Countries = pgTable('countries', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	code: varchar('code', { length: 2 }).notNull(),
	name: text().notNull(),
	phone: smallint('phone').notNull(),
	capital: text('capital'),
	currency: varchar('currency', { length: 3 }),
	continent: continentEnum('continent'),
});
export type Country = InferSelectModel<typeof Countries>;
