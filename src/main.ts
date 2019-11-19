import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log(join(__dirname, './OAReport/dist'))
  app.useStaticAssets(join(__dirname, '..', './public/OAReport/dist'), {
    prefix: '/oa/report',
  })
  app.setBaseViewsDir(join(__dirname, '..', 'views/OAReport'))
  app.setViewEngine('hbs');
  // const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
