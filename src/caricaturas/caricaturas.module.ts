import { Module } from '@nestjs/common';
import { CaricaturasService } from './caricaturas.service';
import { CaricaturasController } from './caricaturas.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Caricatura, CaricaturaSchema } from './entities/caricatura.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CaricaturasController],
  providers: [CaricaturasService],
  imports:[
    ConfigModule,
    AuthModule,
    MongooseModule.forFeature([{
      name:Caricatura.name,
      schema:CaricaturaSchema,
    }])

  ],
  exports:[MongooseModule]
})
export class CaricaturasModule {}
