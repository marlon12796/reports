import { chartJsToImage } from '../helper/chart-generate';
import { CHART_COLORS, getMonths, numbers, transparentize } from '../utils/chart';
interface BarChartConfig {
	width?: number;
	height?: number;
}
export const generateBarChart = async (options: BarChartConfig) => {
	const { width = 300, height = 275 } = options;
	const DATA_COUNT = 7;
	const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

	const labels = getMonths({ count: 7 });
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Fully Rounded',
				data: numbers(NUMBER_CFG),
				borderColor: CHART_COLORS.red,
				backgroundColor: transparentize(CHART_COLORS.red, 0.5),
				borderWidth: 2,
				borderRadius: Number.MAX_VALUE,
				borderSkipped: false,
			},
			{
				label: 'Small Radius',
				data: numbers(NUMBER_CFG),
				borderColor: CHART_COLORS.blue,
				backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
				borderWidth: 2,
				borderRadius: 5,
				borderSkipped: false,
			},
		],
	};
	const chartConfig = {
		type: 'bar',
		data: data,
	};
	return chartJsToImage({ chartConfig, options: { width, height } });
};
