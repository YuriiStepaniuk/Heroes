import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  UPLOADS_FOLDER_NAME,
  UPLOADS_ROUTE_PREFIX,
} from './common/constants/storage.constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', UPLOADS_FOLDER_NAME), {
    prefix: UPLOADS_ROUTE_PREFIX,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
