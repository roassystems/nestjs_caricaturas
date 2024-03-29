import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CaricaturasModule } from './caricaturas/caricaturas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({

      rootPath: join(__dirname, '..', 'public'),
    }),
    // aca se pueden definir credenciales de conexion a mongodb
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsdb'
    }),
    CaricaturasModule,
    CommonModule,
    SeedModule,
    AuthModule

  ],
  controllers: [AppController],
})
export class AppModule {
  constructor() {

    //console.log(process.env);
  }
}
