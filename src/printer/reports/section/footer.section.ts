import { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (currentPage: number, pageCount: number, pageSize: ContextPageSize): Content => {
	return {
		text: `Página ${currentPage.toString()} de ${pageCount}`,
		alignment: 'right',
		margin: [0, 10, 15, 0],
		fontSize: 12,
	};
};
