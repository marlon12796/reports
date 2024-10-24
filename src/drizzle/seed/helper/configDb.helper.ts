import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../schema/schema';

process.loadEnvFile();

const pool = new Pool({
	connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DATABASE_DEV_URL,
	ssl: process.env.NODE_ENV === 'production',
});

export const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
