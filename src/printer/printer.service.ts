import { Injectable } from '@nestjs/common';
import pdfPrinter from 'pdfmake';
import { fonts } from './config/fonts';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class PrinterService {
  protected readonly pdfPrinterConfig: pdfPrinter;
  constructor() {
    this.pdfPrinterConfig = new pdfPrinter(fonts);
  }
  createPdf(docDefinition: TDocumentDefinitions, options: BufferOptions = {}) {
    const doc = this.pdfPrinterConfig.createPdfKitDocument(
      docDefinition,
      options,
    );
    return doc;
  }
}
