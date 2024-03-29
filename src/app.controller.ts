import { Controller, ForbiddenException, Get, HttpCode } from '@nestjs/common';
import { Auth } from './auth/decorators';

@Controller()
export class AppController {


    @Get('/.DS_Store')
    @HttpCode(403)
    getArchivoSensibleServidor() {
        console.log("solicitud de archivo de servidor oculto .DS_Store");
        throw new ForbiddenException("Solicitud prohibida !");
    }

    @Get('/._darcs')
    @HttpCode(403)
    getArchivoSensibleServidor2() {
        console.log("solicitud de archivo de servidor oculto ._darcs");
        throw new ForbiddenException("Solicitud prohibida !");
    }


    @Get('.bzr')
    @HttpCode(403)
    getArchivoSensibleServidor3() {
        console.log("solicitud de archivo de servidor oculto .bzr");
        throw new ForbiddenException("Solicitud prohibida !");
    }

    @Get('.hg')
    @HttpCode(403)
    getArchivoSensibleServidor4() {
        console.log("solicitud de archivo de servidor oculto .hg");
        throw new ForbiddenException("Solicitud prohibida !");
    }

    @Get('BitKeeper')
    @HttpCode(403)
    getArchivoSensibleServidor5() {
        console.log("solicitud de archivo de servidor oculto BitKeeper");
        throw new ForbiddenException("Solicitud prohibida !");
    }
}