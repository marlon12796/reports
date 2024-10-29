import path from 'node:path';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/common/utils/date-formatter';

interface HeaderOptions {
	showLogo?: boolean;
	showDate?: boolean;
	title?: string;
	subtitle?: string;
	sizeTitle?: number;
	sizeSubtitle?: number;
}
export const headerSection = (headerOptions: HeaderOptions) => {
	const { title = false, showDate = true, showLogo = true, subtitle, sizeTitle = 21, sizeSubtitle = 17 } = headerOptions;

	const logo: Content = {
		image: path.join(process.cwd(), 'src/assets/tucan-code-logo.png'),
		width: 100,
		height: 100,
		margin: [0, 0],
	};
	const headerLogo = showLogo ? [logo] : [];
	const headerDate: Content = showDate
		? [
				{
					text: `${DateFormatter.getDDMMYYYY(new Date())}`,
					alignment: 'right',
					margin: [20, 45],
					width: 100,
					fontSize: 10,
				},
			]
		: [];
	const isStackContent: Content = title
		? [
				{
					stack: [
						{ text: '', margin: [0, 15] },
						{ text: title, style: { bold: true, alignment: 'center', fontSize: sizeTitle } },
						{ text: subtitle, alignment: 'center', fontSize: sizeSubtitle },
					],
				},
			]
		: [{ text: '' }];
	const header: TDocumentDefinitions['header'] = {
		style: 'tableExample',
		layout: 'noBorders',
		table: {
			widths: ['auto', '*', 'auto'],

			body: [[...headerLogo, ...isStackContent, ...headerDate]],
		},
		alignment: 'center',
	};
	return header;
};
