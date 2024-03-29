import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuarioSchema } from './entities/usuarios.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([{
      name:Usuarios.name,
      schema:UsuarioSchema,
    }]),
     //definicion de autenticacion del app
     PassportModule.register({defaultStrategy:'jwt'}),
     JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        // console.log('JWT Secret', configService.get('JWT_SECRET') )
        // console.log('JWT SECRET', process.env.JWT_SECRET)
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn:'2h'
          }
        }
      }
    })
     /*JwtModule.register({
       secret:process.env.JWT_SECRET,
       signOptions:{
         expiresIn:'2h'
       }
     }),*/

  ],
  exports:[MongooseModule,JwtStrategy,PassportModule,JwtModule]
})
export class AuthModule {}
