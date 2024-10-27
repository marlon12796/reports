import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, storeOrderByIdReport } from 'src/printer/reports';

@Injectable()
export class StoreReportsService {
	constructor(private readonly printerService: PrinterService) {}
	async getOrderByReport(orderId: number) {
		// console.log({ orderId });}
		const docDefinition = await storeOrderByIdReport();
		const pdfDoc = this.printerService.createPdf(docDefinition);

		return pdfDoc;
	}
}
