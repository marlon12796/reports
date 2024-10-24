import * as readline from 'readline';
import * as fs from 'fs';
import { toCamelCase } from 'drizzle-orm/casing';

export const readCSV = (filePath: string): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		const employees = [];
		const file = readline.createInterface(fs.createReadStream(filePath, { encoding: 'utf-8' }));

		let header: string[] = [];

		file.on('line', (line) => {
			const fields = line.match(/([^,"]+|"[^"]*")+/g).map((item) => item.replace(/(^"|"$)/g, ''));

			if (header.length === 0) {
				header = fields.map((field) => toCamelCase(field.toLowerCase().trim()));
				return;
			}

			const employee: Record<string, string> = {};
			fields.forEach((field, index) => {
				employee[header[index]] = field.trim();
				if (header[index] === 'position') employee[header[index]] = employee[header[index]].toUpperCase();
			});
			employees.push(employee);
		});

		file.on('close', () => resolve(employees));
		file.on('error', (error) => reject(error));
	});
};
