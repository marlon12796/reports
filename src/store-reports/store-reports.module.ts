import { Module } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
	controllers: [StoreReportsController],
	providers: [StoreReportsService],
	imports: [PrinterModule, DrizzleModule],
})
export class StoreReportsModule {}
