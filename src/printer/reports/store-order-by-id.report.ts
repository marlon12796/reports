import path from 'node:path';
import type { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs/promises';
import { footerSection } from './section/footer.section';
import { CurrencyFormatter } from 'src/common/utils';

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
export const storeOrderByIdReport = async (): Promise<TDocumentDefinitions> => {
	const logo: Content = {
		image: await getImageBase64(path.join(process.cwd(), 'src/assets/tucan-banner.png')),
		width: 100,
		height: 35,
		margin: [25, 30],
	};

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
								text: `Recibo No. 12345\n`,
								bold: true,
							},
							`Fecha del recibo: 15 de octubre de 2024\nPagar antes de: 30 de octubre de 2024\n`,
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
						[{ text: 'Razón Social:', bold: true }, { text: 'Empresa Ficticia S.A.' }],
						[{ text: 'Contacto:', bold: true }, { text: 'Michael Holz' }],
						[{ text: 'Dirección:', bold: true }, { text: 'Grenzacherweg 237' }],
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
						[
							{ text: '001', alignment: 'left' },
							{ text: 'Producto A', alignment: 'left' },
							{ text: '2', alignment: 'center' },
							{ text: CurrencyFormatter.format(10, 'USD'), alignment: 'right' },
							{ text: CurrencyFormatter.format(200, 'USD'), alignment: 'right' },
						],
						[
							{ text: '002', alignment: 'left' },
							{ text: 'Producto B', alignment: 'left' },
							{ text: '1', alignment: 'center' },
							{ text: CurrencyFormatter.format(15, 'USD'), alignment: 'right' },
							{ text: CurrencyFormatter.format(1500, 'USD'), alignment: 'right' },
						],
						[
							{ text: '003', alignment: 'left' },
							{ text: 'Producto C', alignment: 'left' },
							{ text: '5', alignment: 'center' },
							{ text: CurrencyFormatter.format(7, 'USD'), alignment: 'right' },
							{ text: CurrencyFormatter.format(350, 'USD'), alignment: 'right' },
						],
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
								['Subtotal', { text: '$3,115.75', bold: true, alignment: 'right' }],
								['Total', { text: '$1,005.75', bold: true, alignment: 'right' }],
							],
						},
					},
				],
			},
		],
	};

	return doc;
};
