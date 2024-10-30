import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
	constructor(private readonly extraReportsService: ExtraReportsService) {}

	@Get('html-report')
	async getHtmlReport(@Res() res: Response) {
		const doc = await this.extraReportsService.getHtmlReport();
		res.setHeader('Content-Type', 'application/pdf');
		doc.pipe(res);
		doc.end();
	}
}
