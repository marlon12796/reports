const COLORS: string[] = ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b', '#8549ba'];

export const color = (index: number) => {
	return COLORS[index % COLORS.length];
};
export const CHART_COLORS = {
	red: '#FF6384',
	orange: '#FF9F40',
	yellow: '#FFCD56',
	green: '#4BC0C0',
	blue: '#36A2EB',
	purple: '#9966FF',
	grey: '#C9CBCF',
};

const NAMED_COLORS: string[] = Object.values(CHART_COLORS);

export const namedColor = (index: number) => {
	return NAMED_COLORS[index % NAMED_COLORS.length];
};

export interface NumbersConfig {
	min?: number;
	max?: number;
	count?: number;
	from?: number[];
	decimals?: number;
	continuity?: number;
}

export const rand = (min = 0, max = 1) => {
	return Math.random() * (max - min) + min;
};

export const numbers = (config: NumbersConfig = {}) => {
	const { min = 0, max = 100, from = [], count = 8, decimals = 8, continuity = 1 } = config;

	const dfactor = Math.pow(10, decimals);
	const data: (number | null)[] = [];

	for (let i = 0; i < count; i++) {
		const baseValue = from[i] ?? 0;
		const randomValue = baseValue + rand(min, max);

		// Añade el valor al array, aplicando continuidad
		if (rand() <= continuity) {
			data.push(Math.round(dfactor * randomValue) / dfactor);
		} else {
			data.push(null);
		}
	}

	return data;
};
/**
 * Convierte un color hexadecimal a rgba y aplica transparencia.
 *
 * @param hexColor - El color en formato hexadecimal (#RRGGBB o #RGB).
 * @param opacity - La opacidad deseada (0 = completamente transparente, 1 = completamente opaco).
 * @returns El color en formato rgba con la opacidad aplicada.
 */
export function transparentize(hexColor: string, opacity: number): string {
	const alpha = Math.max(0, Math.min(1, opacity));

	if (hexColor.startsWith('#')) hexColor = hexColor.slice(1);
	if (hexColor.length === 3)
		hexColor = hexColor
			.split('')
			.map((c) => c + c)
			.join('');

	const r = parseInt(hexColor.slice(0, 2), 16);
	const g = parseInt(hexColor.slice(2, 4), 16);
	const b = parseInt(hexColor.slice(4, 6), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
interface GetMonthTypes {
	count?: number;
	section?: number;
	locale?: string;
}
export const getMonths = (config: GetMonthTypes = {}) => {
	const { count = 12, section, locale = 'en-US' } = config;
	const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });
	const values: string[] = [];
	for (let i = 0; i < count; i++) {
		const monthName = formatter.format(new Date(0, i));
		values.push(section ? monthName.substring(0, section) : monthName);
	}
	return values;
};
