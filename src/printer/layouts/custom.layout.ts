import { CustomTableLayout, ContentTable } from 'pdfmake/interfaces';

export const customLayoutReport: Record<string, CustomTableLayout> = {
	customLayoutReport: {
		hLineWidth: (i: number, node: ContentTable) => {
			if (i === 0 || i === node.table.body.length) {
				return 0;
			}
			return i === node.table.headerRows ? 2 : 1;
		},
		vLineWidth: (i: number) => {
			return 0;
		},
		hLineColor: (i: number) => {
			return i === 1 ? 'black' : '#aaa';
		},
		paddingTop: (i: number): number => {
			return i === 0 ? 2 : 1;
		},
		paddingBottom: (i: number, node: ContentTable): number => {
			return i === 0 ? 2 : 1;
		},
		fillColor: (i: number, node: ContentTable) => {
			if (i === 0) return '#7b90be';
			return i % 2 === 0 ? '#f3f3f3' : '#ffffff';
		},
	},
};
