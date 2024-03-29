import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActualizarUsuarioDto, LoginUsuarioDto, CrearUsuarioDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUsuario } from './decorators/get_usuario.decorator';
import { Usuarios } from './entities/usuarios.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';


@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registrar_usuario')
  create(@Body() CrearUsuarioDto: CrearUsuarioDto) {
    return this.authService.create(CrearUsuarioDto);
  }

  @Post('login')
  loginUsuario(@Body() loginUsuarioDTO: LoginUsuarioDto) {
    return this.authService.loginProcess(loginUsuarioDTO);
  }

  @Get('ruta_privada')
  @UseGuards(AuthGuard())
  rutaPrivada(
    @GetUsuario() user: Usuarios,
    @GetUsuario('email') userEmail: Usuarios
  ) {
    return {
      ok: true,
      message: 'Hola mundo en ruta privada',
      user,
      userEmail
    }
  }

  @Get('ruta_privada2')
  @RoleProtected(ValidRoles.superUsuario, ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  rutaPrivada2(
    @GetUsuario() user: Usuarios,
  ) {
    return {
      ok: true,
      message: 'Hola mundo en ruta privada 2. usando decorador de autenticacion y decorador de autorizacion',
      user
    }
  }

  @Get('ruta_privada3')
  @Auth(ValidRoles.admin,ValidRoles.superUsuario)
  rutaPrivada3(
    @GetUsuario() user: Usuarios,
  ) {
    return {
      ok: true,
      message: 'Hola mundo en ruta privada 3, todo autenticado y autorizado en un solo decorador',
      user
    }
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUsuario() user:Usuarios) { 

    return this.authService.chequearEstadoUsuario(user);
  }

}
