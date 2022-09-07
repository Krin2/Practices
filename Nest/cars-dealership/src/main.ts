import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Esta propiedad hace que la validacion devuelva solo los datos validados. El resto es removido
      forbidNonWhitelisted: true, // Esta propiedad hace que devuelva un error por los datos extras o erroneos enviados
    }),
  );
  await app.listen(3000);
}
bootstrap();
