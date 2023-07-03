import 'reflect-metadata';

import { AppModule } from './modules/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
