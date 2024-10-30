import htmlToPdfMake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';
interface ContentReplacer {
	[key: string]: string;
}
export const getHtmlContent = (html: string, replacers: ContentReplacer = {}) => {
	Object.entries(replacers).forEach(([key, value]) => {
		const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
		html = html.replace(regex, value);
	});

	const dom = new JSDOM(html);
	const { window } = dom;
	return htmlToPdfMake(html, { window });
};
