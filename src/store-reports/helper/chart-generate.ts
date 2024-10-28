interface ChartOptions {
	width?: number;
	height?: number;
}
const API_CHART_URL = 'https://quickchart.io/chart';
export const chartJsToImage = async ({ chartConfig, options = {} }: { chartConfig: unknown; options?: ChartOptions }) => {
	const encodedChartConfig = encodeURIComponent(JSON.stringify(chartConfig));
	const urlParam = new URLSearchParams();
	if (options.width) urlParam.append('width', options.width.toString());
	if (options.height) urlParam.append('height', options.height.toString());
	const chartUrl = `${API_CHART_URL}?c=${encodedChartConfig}&$${urlParam.toString()}`;
	try {
		const response = await fetch(chartUrl);

		if (!response.ok) throw new Error(`Error: ${response.statusText}`);
		const imageBuffer = await response.arrayBuffer();
		return `data:image/png;base64,${Buffer.from(imageBuffer).toString('base64')}`;
	} catch (error) {
		console.error('Error al obtener la imagen del gráfico:', error);
		throw new Error('No se pudo obtener la imagen del gráfico');
	}
};
