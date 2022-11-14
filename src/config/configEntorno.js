import 'dotenv/config'
import parseArgs from 'minimist'

//-------------RECUPERACION ARGUMENTOS-----------
const optiones= { 
    alias:{p: 'port'},
    default:{p: 8080}
}
export const arg = parseArgs(process.argv.slice(2), optiones)

//-------------RECUPERACION VARIABLES DE ENTORNO-----------
export const PERSISTENCIA = process.env.PERSISTENCIA
export const HOST_MONGO = process.env.HOST_MONGO
export const PORT_MONGO = process.env.PORT_MONGO
export const PORT = process.env.PORT||arg.port
export const NODE_ENV = process.env.NODE_ENV
export const MONGO_ATLAS = process.env.MONGO_ATLAS
export const TEL_ADMIN = process.env.TEL_ADMIN
export const TEL_TWILIO = process.env.TEL_TWILIO
export const TWILIO_SID = process.env.TWILIO_SID
export const TWILIO_TOKEN = process.env.TWILIO_TOKEN
export const EMAIL_ADMIN = process.env.EMAIL_ADMIN
export const EMAIL_ENVIOS = process.env.EMAIL_ENVIOS
export const PASS_ENVIOS = process.env.PASS_ENVIOS 
