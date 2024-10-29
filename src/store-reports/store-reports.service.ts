import { Inject, Injectable } from '@nestjs/common';
import { count, desc, eq, sql } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { Customers, Orders } from 'src/drizzle/schema/schema';
import { DrizzleDB } from 'src/drizzle/types/types';
import { PrinterService } from 'src/printer/printer.service';
import { basicReportChart, storeOrderByIdReport, getStatisticsReport } from 'src/printer/reports';

@Injectable()
export class StoreReportsService {
	constructor(
		private readonly printerService: PrinterService,
		@Inject(DRIZZLE) private db: DrizzleDB,
	) {}
	async getOrderByIdReport(orderId: number) {
		const storeOrder = await this.db.query.Orders.findFirst({
			with: {
				customer: true,
				orderDetails: {
					with: {
						product: true,
					},
					columns: {
						quantity: true,
						orderDetailId: true,
					},
				},
			},
			columns: {
				orderDate: true,
				orderId: true,
			},
			where: eq(Orders.orderId, orderId),
		});
		const docDefinition = await storeOrderByIdReport({
			customer: storeOrder.customer,
			orderDetails: storeOrder.orderDetails,
			orderDate: storeOrder.orderDate,
			orderId: storeOrder.orderId,
		});
		const pdfDoc = this.printerService.createPdf(docDefinition);

		return pdfDoc;
	}
	async getSVGCharts() {
		const docDefinition = await basicReportChart();
		const doc = this.printerService.createPdf(docDefinition);
		return doc;
	}
	async getStatistics() {
		const topCountries = await this.db
			.select({
				country: Customers.country,
				total: count(Customers.customerId).as('total'),
			})
			.from(Customers)
			.groupBy(Customers.country)
			.orderBy(sql`total desc`)
			.limit(10);
		const statisticsReport = await getStatisticsReport({ topCountries });
		const doc = this.printerService.createPdf(statisticsReport);
		return doc;
	}
}
