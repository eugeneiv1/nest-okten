import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppConfig } from './configs/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('nest-okten')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelExpandDepth: 3,
      persistAuthorization: true,
    },
  });
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    const url = `http://${appConfig.host}:${appConfig.port}`;
    Logger.log(`Server is running: ${url}`);
    Logger.log(`Swagger is running on: ${url}/docs`);
  });
}
bootstrap();
