import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", process.env.DOMINIO_APP_WEB],
        "style-src": ["'self'", process.env.STYLE_FONT_SRC],
        "font-src": ["'self'", process.env.STYLE_FONT_SRC],
      },
    },
    
  }));
  
  //Esta linea puede arrojar alertas medias
  // de Hidden File Found 
  //mejor definir el conexto en el controlador para poder rechazar acceso a archivos 
  //de configuracion del servidor
  //app.setGlobalPrefix('api')

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
