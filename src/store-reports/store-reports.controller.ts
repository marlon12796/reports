import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
	constructor(private readonly storeReportsService: StoreReportsService) {}
	@Get('order/:orderId')
	async getOrderReport(@Param('orderId', ParseIntPipe) orderId: number, @Res() response: Response) {
		const pdf = await this.storeReportsService.getOrderByIdReport(orderId);
		response.setHeader('Content-Type', 'application/pdf');
		pdf.info.Title = 'Order-Report';
		pdf.pipe(response);
		pdf.end();
	}

	@Get('svg-charts')
	async getSVGCharts(@Res() response: Response) {
		const pdfDoc = await this.storeReportsService.getSVGCharts();
		response.setHeader('Content-Type', 'application/pdf');
		pdfDoc.info.Title = 'Svg-Chart-Report';
		pdfDoc.pipe(response);
		pdfDoc.end();
	}
}
