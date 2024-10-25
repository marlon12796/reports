import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/types';
import pdfPrinter from 'pdfmake';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, getEmploymentLetterReport, getEmploymentLetterByIdReport, getCountriesReport } from 'src/printer/reports';
import { Employess } from 'src/drizzle/schema/employees.schema';
import { eq } from 'drizzle-orm';
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
	async employmentLetterById(id: number) {
		const employee = await this.db.select().from(Employess).where(eq(Employess.id, id));
		if (employee.length === 0) throw new NotFoundException(`Employee with ${employee[0].id} not found`);
		const firstEmployee = employee[0];
		const docDefinition = getEmploymentLetterByIdReport({
			employerName: 'Marlon Ureta',
			employerPosition: 'Gerente de RR.HH',
			employerCompany: 'Tucan Code Corp.',
			employeeName: firstEmployee.name,
			employeePosition: firstEmployee.position,
			employeeHours: firstEmployee.hoursPerDay,
			employeeStartDate: new Date(firstEmployee.startDate),
			employeeWorkSchedule: firstEmployee.workSchedule,
		});
		const doc = this.printerService.createPdf(docDefinition);

		return doc;
	}
	getCountries() {
		const docDefinition = getCountriesReport();
		const doc = this.printerService.createPdf(docDefinition);
		return doc;
	}
}
