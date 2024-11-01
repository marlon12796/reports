import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerCommunity, clientTableCommunity } from './community';

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
						[
							{ text: '', margin: [0, 10] },
							{ text: '5', margin: [0, 25], rowSpan: 2, fontSize: 12 },
							{ text: '', margin: [0, 10] },
							{ text: 'PUERTA INTERIOR', alignment: 'start', bold: true, margin: [10, 10] },
							{
								margin: 0,
								table: {
									widths: ['*', '*', '*', '*', '*'],
									body: [
										[
											{ text: '45', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '75', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '25', marginTop: 10 },
										],
									],
								},
								layout: 'noBorders',
							},
							{ text: '', alignment: 'center', margin: [0, 10] },
							{ text: '', alignment: 'center', margin: [0, 10] },
						],
						[
							{ text: '', margin: [0, 10] },
							{ text: '' },
							{ text: '', margin: [0, 10] },
							{ text: 'PUERTA INTERIOR', alignment: 'start', bold: true, margin: [10, 10] },
							{
								margin: 0,
								table: {
									widths: ['*', '*', '*', '*', '*'],
									body: [
										[
											{ text: '45', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '75', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '25', marginTop: 10 },
										],
									],
								},
								layout: 'noBorders',
							},
							{ text: '', alignment: 'center', margin: [0, 10] },
							{ text: '', alignment: 'center', margin: [0, 10] },
						],
						[
							{ text: '', margin: [0, 10] },
							{ text: '10', margin: [0, 25], rowSpan: 2, fontSize: 12 },
							{ text: '', margin: [0, 10] },
							{ text: 'PUERTA INTERIOR', alignment: 'start', bold: true, margin: [10, 10] },
							{
								margin: 0,
								table: {
									widths: ['*', '*', '*', '*', '*'],
									body: [
										[
											{ text: '45', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '75', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '25', marginTop: 10 },
										],
									],
								},
								layout: 'noBorders',
							},
							{ text: '', alignment: 'center', margin: [0, 10] },
							{ text: '', alignment: 'center', margin: [0, 10] },
						],
						[
							{ text: '', margin: [0, 10] },
							{ text: '' },
							{ text: '', margin: [0, 10] },
							{ text: 'PUERTA INTERIOR', alignment: 'start', bold: true, margin: [10, 10] },
							{
								margin: 0,
								table: {
									widths: ['*', '*', '*', '*', '*'],
									body: [
										[
											{ text: '45', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '75', marginTop: 10 },
											{ text: '50', marginTop: 10 },
											{ text: '25', marginTop: 10 },
										],
									],
								},
								layout: 'noBorders',
							},
							{ text: '', margin: [0, 10] },
							{ text: '', margin: [0, 10] },
						],
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
			// Fila de Totales
		],
	};
	return docDefinition;
};
