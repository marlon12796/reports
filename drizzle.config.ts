import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
	path: '.env',
});
export default defineConfig({
	schema: './src/drizzle/schema/**.schema.ts',
	dialect: 'postgresql',
	out: './drizzle',
	dbCredentials: {
		url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DATABASE_DEV_URL,
	},
	verbose: true,

	strict: true,
});
