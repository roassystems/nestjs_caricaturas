import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUsuario = createParamDecorator((data, ctx: ExecutionContext) => {
    console.log("data " + data);
    const req = ctx.switchToHttp().getRequest();
    const usuario = req.user;
    if (!usuario)
        throw new InternalServerErrorException('usuario no encontrado en request');

    return (!data) ? usuario : usuario[data];
});