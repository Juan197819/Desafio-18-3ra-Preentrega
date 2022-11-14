import twilio from 'twilio';
import {TEL_ADMIN, TEL_TWILIO,TWILIO_SID, TWILIO_TOKEN} from './configEntorno.js';

const cliente = twilio(TWILIO_SID,TWILIO_TOKEN)

const envioMensaje= async (cuerpoMensaje,destinatario=TEL_ADMIN)=>{
    console.log(destinatario);
    // try {
    //   let mensaje= await cliente.messages.create({
    //     body:cuerpoMensaje,
    //     from: TEL_TWILIO,
    //     to: destinatario
    //   })
    //   console.log(mensaje);
    // } catch (error) {
    //   console.log(error)
    // }
}
export default envioMensaje