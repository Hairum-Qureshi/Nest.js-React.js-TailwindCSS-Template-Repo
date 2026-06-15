import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') ?? 3000;
  await app.listen(PORT);

  console.log(`Nest.js Server successfully started on port ${PORT}!`);
}
bootstrap();
