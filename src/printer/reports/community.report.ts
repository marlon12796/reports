import path from 'node:path';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = () => {
	const docDefinition: TDocumentDefinitions = {
		header: {
			margin: [15, 15],
			layout: 'noBorders',
			table: {
				widths: [80, '*', 'auto'],
				body: [
					[
						{
							image: path.join(process.cwd(), 'src/assets/tucan-code-logo.png'),
							fit: [80, 80],
						},
						{
							alignment: 'center',
							marginTop: 15,
							fontSize: 12,
							text: `Forest Admin Community SAP\n RUT: 44.123.1233\n Camino montaña km 14\n Teléfono: 323.3123.123`,
						},
						{
							marginTop: 5,
							layout: 'borderColor',
							table: {
								widths: ['auto', 'auto'],
								body: [
									[
										{ text: 'No. Fac:', alignment: 'left' },
										{ text: '123-456', alignment: 'right' },
									],
									[
										{ text: 'Fecha:', alignment: 'left' },
										{ text: '2021-09-01', alignment: 'right' },
									],
									[
										{ text: 'Versión:', alignment: 'left' },
										{ text: '2024-001', alignment: 'right' },
									],
								],
							},
						},
					],
				],
			},
		},
		pageMargins: [20, 112, 20, 40],
		content: [
			{
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1, lineColor: '#3A4546' }],
			},
			{
				layout: 'finalReport',
				marginTop: 10,
				style: {
					fontSize: 7.5,
					bold: true,
				},
				table: {
					widths: [90, '*', 90, '*'],

					body: [
						[{ text: 'DATOS DEL CLIENTE', fillColor: '#445E93', color: '#ffffff', colSpan: 4 }, '', '', ''],
						[
							{ text: 'RAZÓN SOCIAL', fillColor: '#343a40', color: '#ffffff' },
							'',
							{ text: 'DIRECCIÓN', fillColor: '#343a40', color: '#ffffff' },
							'',
						],
						[{ text: 'RUC', fillColor: '#343a40', color: '#ffffff' }, '', { text: 'TELÉFONO', fillColor: '#343a40', color: '#ffffff' }, ''],
						[
							{ text: 'GIRO', fillColor: '#343a40', color: '#ffffff' },
							'',
							{ text: 'CONDICIÓN DE PAGO', fillColor: '#343a40', color: '#ffffff' },
							'',
						],
					],
				},
			},
			{
				layout: 'finalReport',
				marginTop: 15,
				style: {
					fontSize: 8,
					bold: true,
				},
				table: {
					widths: [90, '*', 90, '*'],
					body: [
						[
							{ text: 'NOMBRE-PROYECTO', fillColor: '#343a40', color: '#ffffff' },
							'',
							{ text: 'CONTACTO', fillColor: '#343a40', color: '#ffffff' },
							'',
						],
						[
							{ text: 'DIRECCIÓN', fillColor: '#343a40', color: '#ffffff' },
							'',
							{ text: 'EMAIL', fillColor: '#343a40', color: '#ffffff' },
							'',
						],
						[
							{ text: 'CIUDAD', fillColor: '#343a40', color: '#ffffff' },
							'',
							{ text: 'TELÉFONO', fillColor: '#343a40', color: '#ffffff' },
							'',
						],
					],
				},
			},
			{
				layout: 'finalReport',
				marginTop: 15,
				style: {
					fontSize: 8,
					bold: true,
				},
				table: {
					widths: [90, '*', 90, '*'],
					body: [
						[
							{ text: 'VENDEDOR', fillColor: '#343a40', color: '#ffffff' },
							'TIARE MORENO',
							{ text: 'EMAIL', fillColor: '#343a40', color: '#ffffff' },
							'RECEPCION@GMAIL.COM',
						],
						[
							{ text: 'TELÉFONO', fillColor: '#343a40', color: '#ffffff' },
							'+568789788',
							{ text: '', fillColor: '#343a40', color: '#ffffff' },
							'',
						],
					],
				},
			},
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
