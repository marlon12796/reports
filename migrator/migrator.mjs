import pkg from 'pg';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import dotenv from 'dotenv'; // Importar dotenv

// Cargar variables de entorno
dotenv.config();

const { Client } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.DATABASE_URL) {
  throw new Error('process.env.DATABASE_URL is undefined.');
}

const connectionString = process.env.DATABASE_URL; // Corregido
console.log({ connectionString });

async function main() {
  console.info('Running migrations...');
  // Crea el cliente de PostgreSQL
  const client = new Client({
    connectionString: connectionString,
  });

  // Inicializa Drizzle ORM
  const db = drizzle(client);

  const migrationsFolder = path.join(__dirname, '../drizzle'); // Cambia la ruta de migración si es necesario

  // Conéctate a la base de datos
  await client.connect();

  // Ejecuta las migraciones
  await migrate(db, { migrationsFolder });
  console.info('Migrated successfully');

  await client.end();
  process.exit(0);
}

main()
  .then(() => {
    console.log('Migration completed successfully');
  })
  .catch((e) => {
    console.error('Migration failed');
    console.error(e);
    process.exit(1);
  });
