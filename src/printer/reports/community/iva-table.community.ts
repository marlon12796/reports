import { type TDocumentDefinitions } from 'pdfmake/interfaces';

export const createInnerTable = (values: string[]) => {
	const content: TDocumentDefinitions['content'] = {
		margin: 0,
		table: {
			widths: ['*', '*', '*', '*', '*'],
			body: [[...values.map((value) => ({ text: value, marginTop: 10 }))]],
		},
		layout: 'noBorders',
	};
	return content;
};
interface IvaProps {
	content: (string | string[])[];
	index: number;
}
export const createRowIva = (rowData: IvaProps) => {
	const { content, index } = rowData;
	if (content.length < 7) throw new Error('The length is not the necessary one');
	const data = content.map((row, idx) => {
		if (index % 2 === 0 && idx === 1 && typeof row === 'string') return { text: row, margin: [0, 25], rowSpan: 2, fontSize: 12 };
		if (index % 2 !== 0 && idx === 1 && typeof row === 'string') return { text: '' };
		if (idx === 3 && typeof row === 'string') return { text: row, alignment: 'start', bold: true, margin: [10, 10] };
		// array row table
		if (idx === 4 && Array.isArray(row) && row.length !== 5) throw new Error('Error in row table ');
		if (idx === 4 && Array.isArray(row)) return createInnerTable(row);
		return { text: row, margin: [0, 10] };
	});
	return data;
};
