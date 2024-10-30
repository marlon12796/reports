import { Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, headerSection } from 'src/printer/reports';
import { getHtmlContent } from './helper/html-to-pdfmake.helper';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class ExtraReportsService {
	constructor(private readonly printerService: PrinterService) {}
	async getHtmlReport() {
		const basePath = path.join(process.cwd(), 'src/extra-reports/html/basic-03.html');
		const file = await readFile(basePath, { encoding: 'utf-8' });
		const content = getHtmlContent(file, {
			client: 'Marlon Ureta',
			title: 'Curso de Nodejs',
		});
		const docDefinition: TDocumentDefinitions = {
			pageMargins: [40, 110, 40, 60],
			header: headerSection({
				title: 'Html to PdfMake',
				subtitle: 'Basic HTML Report',
			}),
			content,
		};
		const pdf = this.printerService.createPdf(docDefinition);
		return pdf;
	}
}
