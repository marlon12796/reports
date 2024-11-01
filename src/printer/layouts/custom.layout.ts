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
	borderColor: {
		hLineWidth: (i, node) => {
			return i === 0 || i === node.table.body.length ? 1 : 0;
		},
		vLineWidth: (i, node) => {
			return i === 0 || i === node.table.body[0].length ? 1 : 0;
		},
		hLineColor: (i, node) => {
			return i === 0 || i === node.table.body.length ? '#5f96d4' : null;
		},
		vLineColor: (i, node) => {
			return i === 0 || i === node.table.body[0].length ? '#5f96d4' : null;
		},
		paddingRight: () => 10,
		paddingLeft: () => 10,
		paddingTop: () => 5,
		paddingBottom: () => 5,
	},
	finalReport: {
		fillColor: 'white',
		hLineColor: (i, node) => {
			return i === 0 || i === node.table.body.length ? '#000000' : null;
		},
		hLineWidth: (i, node) => {
			return i === 0 || i === node.table.body.length ? 1 : 0;
		},
		paddingRight: () => 10,
		paddingLeft: () => 10,
		paddingTop: () => 7,
		paddingBottom: () => 7,
	},
	topIvaReport: {
		fillColor: '#445E93',
		vLineColor: (i, node) => {
			return 'white';
		},
	},
	topChildrenIvaReport: {
		fillColor: '#445E93',
		vLineColor: () => {
			return 'white';
		},
		hLineWidth: (i, node: ContentTable) => {
			return i === 1 || i === node.table.body[0].length ? 1 : 0;
		},
		vLineWidth: (i, node: ContentTable) => {
			return i === 0 || i === node.table.body[0].length ? 0 : 1;
		},
		hLineColor: () => {
			return 'white';
		},
	},
	mainIvaReport: {
		vLineColor: () => {
			return '#445E93';
		},
		vLineWidth: (i, node: ContentTable) => {
			return i === 0 || i === node.table.body[0].length ? 2 : 1;
		},
		hLineColor: () => {
			return '#445E93';
		},
		hLineWidth: (i, node: ContentTable) => {
			return i % 2 === 0 || i === node.table.body.length ? 2 : 1;
		},
		
	},
};
