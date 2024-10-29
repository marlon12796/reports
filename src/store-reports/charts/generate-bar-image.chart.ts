import { chartJsToImage } from '../helper/chart-generate';

export const generateChartImage = async () => {
	const chartConfig = {
		type: 'bar',
		data: {
			labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
			datasets: [
				{
					label: 'Mi primer gráfico',
					data: [65, 59, 80, 81, 56, 55, 10],
					backgroundColor: 'rgba(93, 75, 192, 0.2)',
					borderColor: 'rgb(81, 75, 192)',
					borderWidth: 1,
				},
			],
		},
	};

	return chartJsToImage({ chartConfig, options: { width: 250, height: 250 } });
};
