import { chartJsToImage } from '../helper/chart-generate';
import { CHART_COLORS, numbers } from '../utils/chart';
interface BarChartConfig {
	width?: number;
	height?: number;
}
export const generatePieChart = async (options: BarChartConfig) => {
	const { width = 300, height = 275 } = options;
	const DATA_COUNT = 5;
	const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100, decimals: 2 };

	const data = {
		labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
		datasets: [
			{
				label: 'Dataset 1',
				data: numbers(NUMBER_CFG),
				backgroundColor: Object.values(CHART_COLORS),
			},
		],
	};
	const chartConfig = {
		type: 'pie',
		data: data,
		options: {
			legend: {
				position: 'top',
			},
			plugins: {
				datalabels: {
					color: 'white',
					font: {
						size: 13,
						weight: 'bold',
					},
				},
			},
		},
	};
	return chartJsToImage({ chartConfig, options: { width, height } });
};
