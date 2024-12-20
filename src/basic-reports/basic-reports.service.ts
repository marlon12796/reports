import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/types';
import pdfPrinter from 'pdfmake';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, getEmploymentLetterReport, getEmploymentLetterByIdReport, getCountriesReport } from 'src/printer/reports';
import { Employees, Countries } from 'src/drizzle/schema/schema';
import { eq } from 'drizzle-orm';
import { ContinentsQueryDto } from './dto/countries.dto';
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
		const employee = await this.db.select().from(Employees).where(eq(Employees.id, id));
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
	async getCountries(countrieData: ContinentsQueryDto) {
		const { continent } = countrieData;
		const countries = await this.db
			.select({
				id: Countries.id,
				name: Countries.name,
				phone: Countries.phone,
				capital: Countries.capital,
				currency: Countries.currency,
				continent: Countries.continent,
			})
			.from(Countries)
			.where(continent ? eq(Countries.continent, continent) : undefined);
		const docDefinition = getCountriesReport({ countries });
		const doc = this.printerService.createPdf(docDefinition);
		return doc;
	}
}
