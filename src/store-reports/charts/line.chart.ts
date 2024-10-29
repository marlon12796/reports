import { chartJsToImage } from '../helper/chart-generate';
import { CHART_COLORS, numbers, transparentize } from '../utils/chart';
interface LineChartConfig {
	width?: number;
	height?: number;
}
export const generateLineChart = async (options: LineChartConfig) => {
	const { width = 275, height = 275 } = options;
	const data = {
		labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
		datasets: [
			{
				label: 'Dataset',
				data: numbers({ count: 6, min: -100, max: 100 }),
				borderColor: CHART_COLORS.red,
				backgroundColor: transparentize(CHART_COLORS.red, 0.5),
				pointStyle: 'circle',
				pointRadius: 10,
				pointHoverRadius: 15,
			},
		],
	};
	const chartConfig = {
		type: 'line',
		data: data,
	};
	return chartJsToImage({ chartConfig, options: { width, height } });
};
