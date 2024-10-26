import { readCSV } from './csvReader.seed';
import { db } from './helper/configDb.helper';
import * as schema from '../schema/schema';
import path from 'node:path';
import { readCountriesCSV } from './csvReaderCountries.seed';
const csvFilePath = path.join(__dirname, 'csv/employees.csv');
const csvCountriesPath = path.join(__dirname, 'csv/countries.csv');

const main = async () => {
	try {
		const [countries, employees] = await Promise.all([readCountriesCSV(csvCountriesPath), readCSV(csvFilePath)]);
		await db.insert(schema.Countries).values(countries);
		await db.insert(schema.Employees).values(employees);

		console.log('inserted successfully');
	} catch (error) {
		console.error('Error inserting', error);
	} finally {
		process.exit(0);
	}
};

main();
