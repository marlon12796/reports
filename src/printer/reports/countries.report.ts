import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './section/header.section';

export const getCountriesReport = () => {
	const doc: TDocumentDefinitions = {
		pageOrientation: 'landscape',
		header: headerSection({ title: 'Countries Report', subtitle: 'List of Countries' }),
		pageMargins: [40, 120],
		content: [
			{
				layout: 'lightHorizontalLines', // optional
				table: {
					headerRows: 1,
					widths: ['*', 'auto', 100, '*'],

					body: [
						['First', 'Second', 'Third', 'The last one'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
						['Value 1', 'Value 2', 'Value 3', 'Value 4'],
					],
				},
			},
		],
	};
	return doc;
};
