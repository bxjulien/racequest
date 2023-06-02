import { BadRequestException, ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors
          .map((error) => Object.values(error.constraints))
          .join(', ');

        console.error('## Validation BadRequestException messages :', messages);
        console.error('## Validation BadRequestException errors :', errors);
        return new BadRequestException(messages);
      },
    }),
  );

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
