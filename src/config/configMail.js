import {createTransport} from 'nodemailer'
import {EMAIL_ADMIN, EMAIL_ENVIOS, PASS_ENVIOS} from './configEntorno.js';

const transporte = createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user: EMAIL_ENVIOS,
        pass: PASS_ENVIOS
    }
})
async function envioMail (asunto, cuerpoMail){
    try {
        const info = await transporte.sendMail({
            from: EMAIL_ENVIOS,
            to: EMAIL_ADMIN,
            subject: asunto,
            html: cuerpoMail
            }       
        )
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}
export const datosUsuarioNuevo = (datosUsuarioNuevo)=>{
    return `
    <h1>Usuario Nuevo</h1>
    <h2>Nombre Completo: ${datosUsuarioNuevo.nombre} ${datosUsuarioNuevo.apellido}</h2>
    <h2>Fecha de Nacimiento: ${datosUsuarioNuevo.fechaNacimiento}</h2>
    <h2>Direccion: ${datosUsuarioNuevo.direccion}</h2>
    <h2>Telefono: ${datosUsuarioNuevo.telefono}</h2>
    <h2>Email: ${datosUsuarioNuevo.username}</h2>
    `
}
export const datosOrdenNueva = (datosOrdenNueva)=>{
    let valorTotalCarrito=0
    return `
    <h1>Detalles de su compra</h1>  
     <table style='padding: 8px 20px; border-collapse:collapse; text-align: center; border: 2px solid rgb(68, 64, 64);'>
        <thead>
            <tr>
                <th style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">Producto</th>
                <th style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">Precio</th>
                <th style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">Cantidad</th>
            </tr>
        </thead>
        <tbody>
        ${datosOrdenNueva.productos.map(product=>{
            valorTotalCarrito+= Number(product.precio*product.cantidad)
            return `      
            <tr>
                <td style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">${product.nombre}"</td>
                <td style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">${product.precio.toFixed(2)}</td>
                <td style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">${product.cantidad}</td>
            </tr>
        `
        }).join("")}
        </tbody>    
        <tfoot>
            <tr>
                <th colSpan="3" style="padding: 8px 20px; border:2px solid rgb(68, 64, 64); border-collapse: collapse;text-align:center;">Total valor del carrito ${valorTotalCarrito.toFixed(2)}</th>
            </tr>
        </tfoot>
        </table>
    `
}
export default envioMail