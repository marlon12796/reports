import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL environment variable is not set');

  return {
    url,
  };
});
