import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports:[ DrizzleModule]
})
export class BasicReportsModule {}
