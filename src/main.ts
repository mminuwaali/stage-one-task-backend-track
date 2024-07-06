import {mw} from "request-ip";
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(mw());
  
  await app.listen(3000);
}
bootstrap();
