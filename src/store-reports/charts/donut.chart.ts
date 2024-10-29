import { chartJsToImage } from '../helper/chart-generate';
interface DonutEntry {
	label: string;
	value: string | number;
}
interface DonutOptions {
	position: 'left' | 'right' | 'top' | 'bottom';
	width: number;
	height: number;
	entries: DonutEntry[];
}
export const generateStatisticsReport = (options: DonutOptions) => {
	const { entries, position, width, height } = options;
	const data = {
		labels: entries.map(({ label }) => label),
		datasets: [
			{
				label: 'Dataset 1',
				data: entries.map(({ value }) => value),
			},
		],
	};
	const chartConfig = {
		type: 'doughnut',
		data: data,
		options: {
			legend: {
				position,
			},

			plugins: {
				datalabels: {
					color: 'white',
					font: {
						size: 16,
						weight: 'bold',
					},
				},
			},
		},
	};
	return chartJsToImage({ chartConfig, options: { width, height } });
};
