import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { BadRequestException } from '@nestjs/common';
import { GlobalExceptionFilter } from './exceptions/GlobalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,
    exceptionFactory: (errors) => {
      const messages: string[] = errors.map(error => error.constraints 
        ? Object.values(error.constraints)[0] : "error occured, please try again later");

      return new BadRequestException({
        statusCode: 400,
        message: messages,
        error: 'Bad Request',
      });
    }
  }));

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
