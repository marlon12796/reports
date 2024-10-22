import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import dbConfig from './config/db.config';
export const DRIZZLE = Symbol('DRIZZLE-CONNECTION');
@Module({
  imports: [ConfigModule.forFeature(dbConfig)],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const pool = new Pool({
          connectionString: config.get('db.url'),
        });
        const db = drizzle(pool, { schema });
        return db
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
