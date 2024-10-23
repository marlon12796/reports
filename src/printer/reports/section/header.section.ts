import path from 'node:path';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/common/helpers/date-formatter';

const logo: Content = {
	image: path.join(process.cwd(), 'src/assets/tucan-code-logo.png'),
	width: 100,
	height: 100,
	margin: [0, 20],
};
interface HeaderOptions {
	showLogo?: boolean;
	showDate?: boolean;
	title?: string;
}
//
export const headerSection = (headerOptions: HeaderOptions) => {
	const { title = false, showDate = true, showLogo = true } = headerOptions;
	const headerLogo = showLogo ? [logo] : [];
	const headerDate: Content = showDate
		? [
				{
					text: `${DateFormatter.getDDMMYYYY(new Date())}`,
					alignment: 'right',
					margin: [20, 20],
				},
			]
		: [];
	const headerTitle: Content = title ? [{ text: title, style: { bold: true, alignment: 'center' } }] : [];

	const header: TDocumentDefinitions['header'] = {
		columns: [...headerLogo, ...headerTitle, ...headerDate],
	};
	return header;
};
