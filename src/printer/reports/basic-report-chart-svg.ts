import { type TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'node:fs/promises';
import path from 'node:path';
import { generateChartImage } from 'src/store-reports/charts/genereta-bar-image.chart';
export const basicReportChart = async (): Promise<TDocumentDefinitions> => {
	const urlPath = path.join(process.cwd(), 'src/assets/ford.svg');
	const svg = await fs.readFile(urlPath, 'utf8');
	const image = await generateChartImage();
	const doc: TDocumentDefinitions = {
		content: [
			{
				svg,
				width: 85,
				fit: [85, 85],
			},
			{
				image,
				fit: [500, 500],
			},
		],
	};
	return doc;
};
