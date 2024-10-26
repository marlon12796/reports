import { Controller, Get, Param, ParseIntPipe, Query, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';
import { ContinentsQueryDto } from './dto/countries.dto';

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
	@Get('employment-letter/:employeeId')
	async employmentLetterById(@Res() res: Response, @Param('employeeId', new ParseIntPipe()) employeeId: number) {
		const pdfDoc = await this.basicReportsService.employmentLetterById(employeeId);
		res.setHeader('Content-Type', 'application/pdf');
		pdfDoc.pipe(res);
		pdfDoc.end();
	}
	@Get('countries')
	async getCountries(@Res() res: Response, @Query() continentData: ContinentsQueryDto) {
		const pdfDoc = await this.basicReportsService.getCountries(continentData);
		res.setHeader('Content-Type', 'application/pdf');
		pdfDoc.pipe(res);
		pdfDoc.end();
	}
}
