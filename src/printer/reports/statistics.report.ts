import { type TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateStatisticsReport } from 'src/store-reports/charts/donut.chart';
import { chartJsToImage } from 'src/store-reports/helper/chart-generate';
import { headerSection } from './section/header.section';
interface TopCountry {
	country: string;
	total: number;
}
interface StatisticsReportTypes {
	title?: string;
	subtitle?: string;
	topCountries: TopCountry[];
}
const generateTopCountryDonuts = async (topCountries: TopCountry[]) => {
	const donutChart = await generateStatisticsReport({
		width: 300,
		height: 300,
		entries: topCountries.map((entry) => ({
			label: entry.country,
			value: entry.total,
		})),
		position: 'left',
	});
	return donutChart;
};
export const getStatisticsReport = async (options: StatisticsReportTypes): Promise<TDocumentDefinitions> => {
	const donutChart = await generateTopCountryDonuts(options.topCountries);
	const doc: TDocumentDefinitions = {
		header: headerSection({
			title: options.title ?? 'Estadísticas',
			sizeTitle: 16,
			sizeSubtitle: 13,
			subtitle: options.subtitle ?? 'Gráficos Estadísticos de La Tienda',
		}),
		pageMargins: [40, 80, 40, 80],
		content: [
			{
				marginTop: 30,
				columns: [
					{
						stack: [
							{ text: '10 Paises Con más Clientes', fontSize: 13, alignment: 'center', marginBottom: 10 },
							{
								image: donutChart,
								fit: [300, 300],
							},
						],
					},
					{
						width: 'auto',
						layout: 'lightHorizontalLines',
						table: {
							headerRows: 1,
							widths: [100, 'auto'],
							body: [['País', 'Clientes'], ...options.topCountries.map((entry) => [entry.country, entry.total])],
						},
					},
				],
			},
		],
	};
	return doc;
};
