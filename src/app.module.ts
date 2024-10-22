import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    BasicReportsModule,
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
