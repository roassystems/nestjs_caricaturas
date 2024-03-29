import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Usuarios extends Document{

    @Prop({
        unique:true,
        index:true
    })
    id:string;

    @Prop({
        unique:true,
        index:true
    })
    email:string;
    
    @Prop()
    password:string;
    
    @Prop()
    nombre:string;
    
    @Prop({ default: true})
    estaActivo:boolean;
    
    @Prop([String])
    roles:string[];


}

export const UsuarioSchema = SchemaFactory.createForClass(Usuarios);

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}