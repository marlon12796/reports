import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('MAIN-APP'); 

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Aplicación escuchando en http://localhost:${port}`);
}

bootstrap();
