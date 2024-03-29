import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuarios } from "../entities/usuarios.entity";
import { JwtPayload } from "../interfaces/jwt.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(@InjectModel(Usuarios.name)
    private readonly usuarioModelo: Model<Usuarios>,
        consigService: ConfigService) {

        super({
            secretOrKey: consigService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Usuarios> {

        const { id } = payload;
        const usuario = await this.usuarioModelo.findOne({ _id: id });
        if (!usuario)
            throw new UnauthorizedException('token no valido');
        if (!usuario.estaActivo)
            throw new UnauthorizedException('Usuario inactivo');
        return usuario;
    }

}