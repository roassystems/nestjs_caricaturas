import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DOMINIO_APP_WEB:Joi.required(),
    STYLE_FONT_SRC:Joi.required()
   
})