import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const logger = new Logger('MAIN-APP');

	const port = process.env.PORT || 3000;
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			always: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	await app.listen(port);
	logger.log(`Aplicación escuchando en http://localhost:${port}`);
}

bootstrap();
