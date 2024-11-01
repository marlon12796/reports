import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerCommunity, clientTableCommunity, createRowIva, createTableRowDownIva } from './community';

export const getCommunityReport = () => {
	const docDefinition: TDocumentDefinitions = {
		header: headerCommunity({
			companyName: 'Forest Admin Community SAP',
			rut: '44.123.1233',
			address: 'Camino montaña km 14',
			phone: '323.3123.123',
			logoPath: 'src/assets/tucan-code-logo.png',
			invoiceNumber: '123-456',
			date: '2021-09-01',
			version: '2024-001',
		}),
		pageMargins: [20, 112, 20, 40],
		content: [
			{
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1, lineColor: '#3A4546' }],
			},
			clientTableCommunity({
				layout: 'finalReport',
				headerData: { text: 'DATOS DEL CLIENTE', fillColor: '#445E93', color: '#ffffff', colSpan: 4 },
				clientData: [
					['Razón Social', ''],
					['Dirección', ''],
					['Rut', ''],
					['Teléfono', ''],
					['Giro', ''],
					['Condición de Pago', ''],
				],
			}),
			clientTableCommunity({
				layout: 'finalReport',
				clientData: [
					['Nombre Proyecto', ''],
					['Contacto', ''],
					['Dirección', ''],
					['Email', ''],
					['Ciudad', ''],
					['Teléfono', ''],
				],
			}),
			clientTableCommunity({
				layout: 'finalReport',
				clientData: [
					['Vendedor', 'TIARE MORENO'],
					['EMAIL', 'RECEPCION@GMAIL.COM'],
					['TELÉFONO', '+568789788'],
					['', ''],
				],
			}),
			{
				marginTop: 10,
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1, lineColor: '#3A4546' }],
			},
			{
				layout: 'noBorders',
				table: {
					widths: ['*'],
					body: [
						[
							{
								text: 'ESTIMADO CLIENTE: NOS PERMITIMOS COTIZAR A USTED LOS SIGUIENTES PRODUCTOS',
								color: '#ffffff',
								fontSize: 8,
								fillColor: '#445E93',
								margin: [10, 10],
								bold: true,
							},
						],
					],
				},
			},
			{
				marginTop: 15,
				fontSize: 8,
				bold: true,
				alignment: 'center',
				layout: 'topIvaReport',
				color: 'white',
				table: {
					widths: [50, 50, 50, '*', 100, 50, 50],
					body: [
						[
							{ text: 'CÓDIGO', margin: [0, 10] },
							{ text: 'RECINTO', margin: [0, 10] },
							{ text: 'CANT.', margin: [0, 10] },
							{ text: 'DESCRIPCIÓN DEL PRODUCTO', alignment: 'center', margin: [0, 10] },
							{
								margin: 0,
								table: {
									widths: ['*', '*', '*', '*', '*'],
									body: [
										[{ text: 'MEDIDA', colSpan: 5 }, '', '', '', ''],
										[{ text: 'E' }, { text: 'X' }, { text: 'A' }, { text: 'X' }, { text: 'L' }],
									],
								},
								layout: 'topChildrenIvaReport',
							},
							{ text: 'VALOR', alignment: 'center', margin: [0, 10] },
							{ text: '', alignment: 'center', margin: [0, 10] },
						],
					],
				},
			},
			{
				marginTop: 15,
				fontSize: 8,
				bold: true,
				alignment: 'center',
				layout: 'mainIvaReport',
				table: {
					widths: [50, 50, 50, '*', 100, 50, 50],
					body: [
						createRowIva({ content: ['0', '5', '', 'Puerta Interior', ['45', '50', '75', '32', '35'], '', ''], index: 0 }),
						createRowIva({ content: ['', '', '', 'Puerta Superior', ['45', '14', '50', '12', '15'], '', ''], index: 1 }),
						createRowIva({ content: ['', '10', '', 'Puerta Del lado', ['5', '140', '5', '22', '75'], '', ''], index: 2 }),
						createRowIva({ content: ['', '', '', 'Puerta Del Costado', ['', '10', '', '22', '50'], '', ''], index: 3 }),
						[
							{ text: '', border: [false] },
							{ text: 'TOTAL', margin: [0, 10], bold: true },
							{ text: '300', margin: [0, 10], bold: true, fontSize: 10 },
							{ text: '', border: [false] },
							{ text: '', border: [false] }, // Total de cantidades
							{ text: '', border: [false] },
							{ text: '', border: [false] },
						],
					],
				},
			},
			createTableRowDownIva('Sub-Total', '$250.00'),
			createTableRowDownIva('Igv', '$45.00'),
			createTableRowDownIva('Total', '$279.59'),
		],
	};
	return docDefinition;
};
