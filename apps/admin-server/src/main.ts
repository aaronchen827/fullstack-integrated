import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { AllExceptionFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('admin');
  const frontendUrl = process.env.FRONTENT_URL || '';
  const whiteOriginList = ['http://localhost:3000'];
  if (frontendUrl) {
    whiteOriginList.push(frontendUrl);
  }
  console.log('whiteOriginList=', JSON.stringify(whiteOriginList));
  app.enableCors({
    origin: whiteOriginList,
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Admin Server')
    .setDescription('Admin Server')
    .setVersion('1.0')
    .build();
  //创建文档
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
