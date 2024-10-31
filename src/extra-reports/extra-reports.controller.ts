import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
	constructor(private readonly extraReportsService: ExtraReportsService) {}
	@Get('html-report')
	async getHtmlReport(@Res() res: Response) {
		const pdfDoc = await this.extraReportsService.getHtmlReport();
		res.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'html-report';
		pdfDoc.pipe(res);
		pdfDoc.end();
	}

	@Get('community-report')
	async getCommunityReport(@Res() res: Response) {
		const pdfDoc = await this.extraReportsService.getCommunity();
		res.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'Billing Report';
		pdfDoc.pipe(res);
		pdfDoc.end();
	}
}
