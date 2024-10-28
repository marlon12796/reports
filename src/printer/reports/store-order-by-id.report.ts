import path from 'node:path';
import type { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs/promises';
import { footerSection } from './section/footer.section';
import { CurrencyFormatter, InvoiceCalculator } from 'src/common/utils';
import { type OrderType } from 'src/drizzle/schema/orders.schema';
import { type CustomerType } from 'src/drizzle/schema/customers.schema';
import { type OrderDetailsType } from 'src/drizzle/schema/orderDetails.schema';
import { ProductType } from 'src/drizzle/schema/products.schema';
import { DateFormatter } from 'src/common/utils/date-formatter';

const getImageBase64 = async (filePath: string): Promise<string> => {
	const image = await fs.readFile(filePath);
	return `data:image/png;base64,${image.toString('base64')}`;
};
const styles: StyleDictionary = {
	header: {
		fontSize: 18,
		bold: true,
	},
	subHeader: {
		fontSize: 16,
		bold: true,
	},
};
type OrderDetail = Omit<OrderDetailsType, 'productId' | 'orderId'> & {
	product: ProductType;
};
interface ReportTypes extends Omit<OrderType, 'customerId'> {
	customer: CustomerType;
	orderDetails: OrderDetail[];
}
export const storeOrderByIdReport = async (value: ReportTypes): Promise<TDocumentDefinitions> => {
	const { orderDetails, customer, orderDate, orderId } = value;
	const logo: Content = {
		image: await getImageBase64(path.join(process.cwd(), 'src/assets/tucan-banner.png')),
		width: 100,
		height: 35,
		margin: [25, 30],
	};
	const subtotal = InvoiceCalculator.calculateSubtotal(
		orderDetails.map((order) => ({
			quantity: order.quantity,
			price: Number(order.product.price),
		})),
	);
	const total = InvoiceCalculator.calculateTotal({ subtotal, discount: 0, taxRate: 0.18 });
	const doc: TDocumentDefinitions = {
		styles,
		header: logo,
		footer: (currentPage, pageCount, pageSize) => footerSection({ currentPage, pageCount, pageSize, margin: [0, 10, 30, 0] }),
		pageMargins: [30, 75, 30, 75],
		content: [
			{ text: 'Tucan Code', style: 'header' },
			{
				marginTop: 5,
				columns: [
					{
						text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com',
					},
					{
						text: [
							{
								text: `Recibo No. ${orderId}\n`,
								bold: true,
							},
							`Fecha del recibo: ${DateFormatter.getDDMMYYYY(new Date(orderDate))}\nPagar antes de: ${DateFormatter.getDDMMYYYY(new Date())}\n`,
						],
						alignment: 'right',
					},
				],
			},
			{
				qr: 'https://example.com/recibo/12345',
				fit: 75,
				alignment: 'right',
			},
			{
				layout: 'noBorders',
				table: {
					widths: ['auto', '*'], // Ajusta los anchos de las columnas según necesidad
					body: [
						[{ text: 'Cobrar a:', style: 'subHeader', colSpan: 2, alignment: 'left', margin: [0, 0, 10, 5] }, {}],
						[{ text: 'Razón Social:', bold: true }, { text: `${customer.customerName}` }],
						[{ text: 'Contacto:', bold: true }, { text: `${customer.contactName}` }],
						[{ text: 'Dirección:', bold: true }, { text: `${customer.address}` }],
					],
				},
			},
			{
				layout: 'headerLineOnly',
				margin: [0, 20],
				table: {
					headerRows: 1,
					widths: [50, '*', 'auto', 'auto', 'auto'],
					body: [
						['Id', 'Descripción', 'Cantidad', { text: 'Precio', alignment: 'center' }, { text: 'Total', alignment: 'center' }],
						...orderDetails.map((detail) => [
							{ text: `${detail.orderDetailId}`, alignment: 'left' },
							{ text: `${detail.product.productName}`, alignment: 'left' },
							{ text: `${detail.quantity}`, alignment: 'center' },
							{ text: CurrencyFormatter.format(Number(detail.product.price), 'USD'), alignment: 'right' },
							{ text: CurrencyFormatter.format(Number(detail.product.price) * detail.quantity, 'USD'), alignment: 'right' },
						]),
					],
				},
			},
			{
				marginTop: 15,
				columns: [
					{ width: '*', text: '' },
					{
						width: 'auto',
						layout: 'noBorders',
						table: {
							headerRows: 1,
							widths: [65, 'auto'],
							body: [
								[
									'Subtotal',
									{
										text: CurrencyFormatter.format(subtotal, 'USD'),
										bold: true,
										alignment: 'right',
									},
								],
								['Total', { text: CurrencyFormatter.format(total, 'USD'), bold: true, alignment: 'right' }],
							],
						},
					},
				],
			},
		],
	};

	return doc;
};
