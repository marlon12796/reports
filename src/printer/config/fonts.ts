import path from 'node:path';

const BASE_FOLDER_PATH = 'fonts';

// Función auxiliar para construir la ruta de las fuentes TTF
const createFontPath = (fontName: string, style: string = '') => {
	return path.join(
		process.cwd(),
		BASE_FOLDER_PATH,
		`${fontName}${style}.ttf`, // Usamos TTF en lugar de WOFF2
	);
};

// Configuración de las fuentes para pdfmake
export const fonts = {
	Roboto: {
		normal: createFontPath('Roboto-Regular'),
		bold: createFontPath('Roboto-Bold'),
		italics: createFontPath('Roboto-MediumItalic'),
		bolditalics: createFontPath('Roboto-BoldItalic'),
	},
};
