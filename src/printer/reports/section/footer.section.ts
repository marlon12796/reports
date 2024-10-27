import { Content, ContextPageSize, Margins } from 'pdfmake/interfaces';

interface FooterParams {
	currentPage: number;
	pageCount: number;
	pageSize: ContextPageSize;
	margin?: Margins;
}

export const footerSection = ({ currentPage, pageCount, pageSize, margin = [0, 0] }: FooterParams): Content => {
	return {
		text: `Página ${currentPage} de ${pageCount}`,
		alignment: 'right',
		margin,
		fontSize: 12,
	};
};
