import path from 'node:path';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface HeaderData {
	companyName: string;
	rut: string;
	address: string;
	phone: string;
	logoPath: string;
	invoiceNumber: string;
	date: string;
	version: string;
}

export const headerCommunity = ({
	companyName,
	rut,
	address,
	phone,
	logoPath,
	invoiceNumber,
	date,
	version,
}: HeaderData): TDocumentDefinitions['header'] => {
	const header: TDocumentDefinitions['header'] = {
		margin: [15, 15],
		layout: 'noBorders',
		table: {
			widths: [80, '*', 'auto'],
			body: [
				[
					{
						image: path.join(process.cwd(), logoPath),
						fit: [80, 80],
					},
					{
						alignment: 'center',
						marginTop: 15,
						fontSize: 12,
						text: `${companyName}\n RUT: ${rut}\n ${address}\n Teléfono: ${phone}`,
					},
					{
						marginTop: 5,
						layout: 'borderColor',
						table: {
							widths: ['auto', 'auto'],
							body: [
								[
									{ text: 'No. Fac:', alignment: 'left' },
									{ text: invoiceNumber, alignment: 'right' },
								],
								[
									{ text: 'Fecha:', alignment: 'left' },
									{ text: date, alignment: 'right' },
								],
								[
									{ text: 'Versión:', alignment: 'left' },
									{ text: version, alignment: 'right' },
								],
							],
						},
					},
				],
			],
		},
	};
	return header;
};
