import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true,//transforma los datos del dto de la request al dato esperado en la validacion
      transformOptions:{
        enableImplicitConversion:true
      }
    })
    );

  await app.listen(process.env.PORT);
  console.log(`App corriendo en el puerto ${process.env.PORT}`);
}
bootstrap();
