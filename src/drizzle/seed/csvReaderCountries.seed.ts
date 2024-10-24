import * as readline from 'readline';
import * as fs from 'fs';

export const readCountriesCSV = (filePath: string): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		const countries = [];
		const file = readline.createInterface(fs.createReadStream(filePath, { encoding: 'utf-8' }));

		let header: string[] = [];

		file.on('line', (line) => {
			const fields = line.match(/([^,"]+|"[^"]*")+/g).map((item) => item.replace(/(^"|"$)/g, ''));

			if (header.length === 0) {
				header = fields.map((field) => field.toLowerCase().trim().replaceAll(' ', '_'));
				return;
			}

			const country: Record<string, string> = {};
			fields.forEach((field, index) => {
				if (header[index] === 'id') return;
				country[header[index]] = field.trim();
			});
			countries.push(country);
		});

		file.on('close', () => resolve(countries));
		file.on('error', (error) => reject(error));
	});
};
