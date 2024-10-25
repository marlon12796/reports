import path from 'node:path';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/common/helpers/date-formatter';

const logo: Content = {
	image: path.join(process.cwd(), 'src/assets/tucan-code-logo.png'),
	width: 100,
	height: 100,
	margin: [0, 0],
};
interface HeaderOptions {
	showLogo?: boolean;
	showDate?: boolean;
	title?: string;
	subtitle?: string;
}
export const headerSection = (headerOptions: HeaderOptions) => {
	const { title = false, showDate = true, showLogo = true, subtitle } = headerOptions;
	const headerLogo = showLogo ? [logo] : [];
	const headerDate: Content = showDate
		? [
				{
					text: `${DateFormatter.getDDMMYYYY(new Date())}`,
					alignment: 'right',
					margin: [20, 30],
					width: 150,
				},
			]
		: [];
	const isStackContent: Content = title
		? [
				{
					stack: [
						{ text: '', margin: [0, 15] },
						{ text: title, style: { bold: true, alignment: 'center', fontSize: 22 } },
						{ text: subtitle, alignment: 'center', fontSize: 14 },
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
	};
	return header;
};
