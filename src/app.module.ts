import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { ConfigModule } from '@nestjs/config';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';
import { ExtraReportsModule } from './extra-reports/extra-reports.module';

@Module({
  imports: [
    DrizzleModule,
    BasicReportsModule,
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
    }),
    PrinterModule,
    StoreReportsModule,
    ExtraReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
