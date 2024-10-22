import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schema/schema';
import { Pool } from 'pg';
import path from 'node:path';
import readline from 'readline';
import fs from 'fs';
process.loadEnvFile();
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production'
      ? process.env.DATABASE_URL
      : process.env.DATABASE_DEV_URL,
  ssl: process.env.NODE_ENV === 'production', // Adjust SSL settings for production
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

const toCamelCase = (str: string) => {
  return str
    .replace(/_./g, (match) => match.charAt(1).toUpperCase()) // Convierte caracteres después de '_' a mayúsculas
    .replace(/^(.)/, (match) => match.toLowerCase()); // Convierte la primera letra a minúscula
};
export const main = async () => {
  const csvFilePath = path.join(__dirname, 'employees.csv');

  const employees = [];
  const file = readline.createInterface(
    fs.createReadStream(csvFilePath, { encoding: 'utf-8' }),
  );
  let header: string[] = [];

  file.on('line', (line) => {
    const fields = line
      .match(/([^,"]+|"[^"]*")+/g)
      .map((item) => item.replace(/(^"|"$)/g, ''));
    if (header.length === 0) {
      header = fields.map((field) =>
        toCamelCase(field.toLowerCase().trim().replaceAll(' ', '_')),
      );
      return;
    }
    const employee = {};
    fields.forEach((field, index) => {
      employee[header[index]] = field.trim();
      if (header[index] === 'position')
        employee[header[index]] = employee[header[index]].toUpperCase();
    });
    employees.push(employee);
  });
  file.on('close', async () => {
    await db.insert(schema.Employess).values(employees);
    process.exit(0);
  });
};
main();
