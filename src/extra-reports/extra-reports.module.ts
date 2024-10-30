import { Module } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { ExtraReportsController } from './extra-reports.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
	controllers: [ExtraReportsController],
	providers: [ExtraReportsService],
	imports: [DrizzleModule, PrinterModule],
})
export class ExtraReportsModule {}
