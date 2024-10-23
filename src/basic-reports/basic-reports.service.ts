import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/types';
import pdfPrinter from 'pdfmake';
import { PrinterService } from 'src/printer/printer.service';
import {
  getHelloWorldReport,
  getEmploymentLetterReport,
} from 'src/printer/reports';
@Injectable()
export class BasicReportsService {
  protected readonly pdfPrinterConfig: pdfPrinter;
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly printerService: PrinterService,
  ) {}
  getHelloDocument() {
    const docDefinition = getHelloWorldReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
