import { type TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateStatisticsReport } from 'src/store-reports/charts/donut.chart';
import { headerSection } from './section/header.section';
import { generateLineChart, generateBarChart, generatePieChart } from 'src/store-reports/charts';
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
	const [donutChart, lineChart, barChart, pieChart] = await Promise.all([
		generateTopCountryDonuts(options.topCountries),
		generateLineChart({}),
		generateBarChart({}),
		generatePieChart({}),
	]);
	const doc: TDocumentDefinitions = {
		header: headerSection({
			title: options.title ?? 'Estadísticas',
			sizeTitle: 16,
			sizeSubtitle: 13,
			subtitle: options.subtitle ?? 'Gráficos Estadísticos de La Tienda',
		}),
		pageMargins: [40, 80, 40, 40],
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
			{
				image: lineChart,
				width: 470,
				height: 250,
				marginTop: 20,
				alignment: 'center',
			},
			{
				marginTop: 20,
				columnGap: 10,
				columns: [
					{
						image: barChart,
						width: 250,
					},
					{
						image: pieChart,
						width: 250,
					},
				],
			},
		],
	};
	return doc;
};
