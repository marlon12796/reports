import { Controller, Get, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get('hello')
  getHello(@Res() res: Response) {
    const pdfDoc = this.basicReportsService.getHelloDocument();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
  @Get('employment-letter')
  employmentLetter(@Res() res: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
