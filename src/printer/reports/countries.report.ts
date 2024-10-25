import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './section/header.section';
import { Country } from 'src/drizzle/schema/countries.schema';
import { footerSection } from './section/footer.section';

interface CountriesReportTypes {
	title?: string;
	subtitle?: string;
	countries: Omit<Country, 'code'>[];
}

export const getCountriesReport = (countriesReport: CountriesReportTypes) => {
	const { title = 'Countries Report', subtitle = 'List of Countries', countries } = countriesReport;
	const doc: TDocumentDefinitions = {
		pageOrientation: 'landscape',
		header: headerSection({ title, subtitle }),
		footer: (currentPage, pageCount, pageSize) => footerSection(currentPage, pageCount, pageSize),
		pageMargins: [40, 120],
		content: [
			{
				layout: 'lightHorizontalLines', // optional
				table: {
					headerRows: 1,
					widths: [50, '*', 'auto', '*', 'auto', 'auto'],
					body: [
						['Id', 'Name', 'Phone', 'Capital', 'Currency', 'Continent'],
						...countries.map((country) => [
							country.id.toString(),
							{ text: country.name, style: { bold: true } },
							country.phone,
							country.capital,
							country.currency,
							country.continent,
						]),
					],
				},
			},
			{
				text: 'Totales',
				margin: [0, 40, 0, 0],
				fontSize: 18,
				bold: true,
			},
			{
				layout: 'noBorders',
				marginTop: 5,
				table: {
					headerRows: 1,
					widths: [100, 'auto'],
					body: [
						[
							{
								text: 'Total de Paises:',
								bold: true,
							},
							{
								text: `${countries.length} paises`,
							},
						],
					],
				},
			},
		],
	};
	return doc;
};
