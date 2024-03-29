import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/create-user.dto';
import { ActualizarUsuarioDto } from './dto/update-user.dto';
import { Usuarios } from './entities/usuarios.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Usuarios.name)
    private readonly usuarioModelo: Model<Usuarios>,

  ) {

  }

  async create(crearUsuarioDto: CrearUsuarioDto) {
    try {
      const { password } = crearUsuarioDto;
      crearUsuarioDto.password = bcrypt.hashSync(password, 10);
      const aregistrar = await this.usuarioModelo.create(crearUsuarioDto);
      //console.log("registrado " + aregistrar);
      return {
        email: aregistrar.email,
        nombre: aregistrar.nombre,
        activo: aregistrar.estaActivo,
        token: this.getJwtToken({ id: aregistrar._id })
      }
    } catch (error) {
      this.hanledException(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    //console.log("token es " + token);
    return token;
  }

  async loginProcess(loginUsuarioDTO: LoginUsuarioDto) {


    const { email, password } = loginUsuarioDTO;
    console.log("recibido " + email);
    const buscado = await this.usuarioModelo.findOne({ email: email });
    console.log("usuario buscado " + buscado);
    if (!buscado) {
      throw new UnauthorizedException(`credenciales invalidas `);
    }
    if (!bcrypt.compareSync(password, buscado.password))
      throw new UnauthorizedException(`credenciales invalidas 2`);

    if (!buscado.estaActivo)
      throw new UnauthorizedException(`Usuario inactivo`);
    return {
      email: buscado.email,
      nombre: buscado.nombre,
      activo: buscado.estaActivo,
      token: this.getJwtToken({ id: buscado._id })
    }
  }

  async chequearEstadoUsuario(usuario:Usuarios) {
    return {
      email: usuario.email,
      nombre: usuario.nombre,
      activo: usuario.estaActivo,
      id:usuario._id,
      nuevo_token: this.getJwtToken({ id: usuario._id })
    }

  }
  
  private hanledException(error: any): never {
    if (error.code === 11000) {

      throw new BadRequestException(`Usuario existe en base de datos ${JSON.stringify(error.keyValue)}`);
      console.log(error);
    }
    throw new InternalServerErrorException('Error no se pudo crear/actualizar el usuario en bd, Check Server Logs ');
  }

}
