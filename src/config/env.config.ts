export const EnvConfiguration = () => ({
    enviroment:process.env.NODE_ENV || 'dev',
    mongodb:process.env.MONGODB,
    port:process.env.PORT || 3002,
    dominio_web:process.env.DOMINIO_APP_WEB
})