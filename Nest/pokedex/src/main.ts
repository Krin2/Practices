import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2'); // agrega el prefijo api a todas las rutas (http://localhost:3000/api/v2)

  await app.listen(3000);
}
bootstrap();
