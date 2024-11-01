import { type TDocumentDefinitions } from 'pdfmake/interfaces';
interface TableCommunityTypes {
	layout: string;
	clientData: [string, string | number][];
	headerData?: { text: string; fillColor: string; colSpan: number; color: string };
	marginTop?: number;
}
const groupByData = <Item>(array: Item[]) => {
	const grouped: Item[][] = [];
	for (let i = 0; i < array.length; i += 2) {
		const sliceData = array.slice(i, i + 2).flat() as Item[];
		grouped.push(sliceData);
	}
	return grouped;
};
export const clientTableCommunity = (data: TableCommunityTypes) => {
	const { clientData, marginTop = 15, layout = 'finalReport', headerData } = data;
	const groupedData = groupByData(clientData);
	const contentBody = groupedData.map((client) =>
		client.map((val, key) => {
			if (key % 2 === 0) return { text: val.toString(), fillColor: '#343a40', color: '#ffffff' };
			return { text: val.toString() };
		}),
	);
	const headerContent = headerData ? [{ text: 'DATOS DEL CLIENTE', fillColor: '#445E93', color: '#ffffff', colSpan: 4 }, '', '', ''] : null;
	const body = [headerContent, ...contentBody].filter((data) => data !== null);
	const content: TDocumentDefinitions['content'] = {
		layout,
		marginTop,
		style: {
			fontSize: 8,
			bold: true,
		},
		table: {
			widths: [90, '*', 90, '*'],
			body,
		},
	};
	return content;
};
