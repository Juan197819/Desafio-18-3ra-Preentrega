import { daoOrden} from '../index.js';
import ordenDto from '../dtos/ordenDto.js';
import envioMail, {datosOrdenNueva} from '../config/configMail.js'
import envioMensaje from '../config/configMensaje.js'

class ServiceOrdenes {

    async serviceGetOrdenes(filtroUsuario){
        // try {
        //     return await daoOrden.leer(filtroUsuario)
        // } catch (error) {
        //     throw ('Error obteniendo Usuario/s: '+ error)
        // }
    }
    async servicePostOrdenes (ordenProductos, emailComprador) {
        try {
            console.log(ordenProductos);
            //Creacion de datos para armar DTO de ORDEN
            const fyh = new Date().toLocaleString()
            const ordenesRegistradas = await daoOrden.leer()
            const numOrden = ordenesRegistradas.length + 1
            //Creacion DTO y guardado en persistencia
            const ordenNueva = ordenDto(emailComprador, numOrden, ordenProductos, fyh)
            const ordenCreada = await daoOrden.guardar(ordenNueva)
            //Creacion de HTML para cuerpo de mail y envio
            const cuerpoMail = datosOrdenNueva(ordenNueva)
            await envioMail(`Nuevo Pedido de ${ordenProductos.nombreCompleto}- Email: ${emailComprador}`,cuerpoMail)
            //ENVIO DE MENSAJE AL N° DEL ADMINISTRADOR POR DEFECTO (VIENE DE .env)
            await envioMensaje(`Nuevo Pedido de ${ordenProductos.nombreCompleto}- Email: ${emailComprador}`)
            //ENVIO DE MENSAJE DE CONFIRMACION AL N° REGISTRADO DEL CLIENTE
            await envioMensaje(`Su pedido ha sido recibido y se encuentra en proceso. Codigo de gestion: ${ordenCreada._id}`, ordenProductos.telefono)
            return (ordenCreada._id)
        } catch (error) {
            throw ('Error creando Ordenes Nuevo: '+ error)
        }
    }
    async servicePutOrdenes(id, avatar, datosNuevos){
        // try {
        //     if (!id) throw ("Se requiere ID de usuario para modificarlo")
        //     let isExist = await daoOrden.leer(id)
        //     if (!isExist.length) throw ("Usuario no existente")
        //     let newData
        //     if (avatar) {
        //         try {
        //             console.log(avatar);
        //             console.log(isExist);
        //             console.log(isExist[0].urlImagen);
        //             await fs.promises.unlink(`./views/img/avatares/${isExist[0].urlImagen}`)
        //             console.log('Avatar anterior BORRADO exitosamente');
        //         } catch (error) {
        //             throw('Error borrando imagen anterior' + error);
        //                 (error)
        //         }
        //         newData={   
        //             urlImagen:avatar.filename,
        //         }
        //     } else {
        //         newData=datosNuevos
        //     }
        //     await daoOrden.modificar(...isExist, newData,'$set')
        //     return(newData)
        // } catch (error) {
        //     throw ('Error modificando Usuario: '+ error)
        // }
    }
    async serviceDeleteOrdenes(id){
        // try {  
        //     let isExist = await daoOrden.leer(id)
        //     if (!isExist.length) {
        //         throw("Usuario no existente")
        //     } else {
        //         const prod = await daoOrden.eliminar(id)
        //         return ('Usuario Eliminado Exitosamente' + prod)
        //     }
        // } catch (error) {
        //     throw ('Error Eliminando Usuario: '+ error)
        // }
     }
    }
export default ServiceOrdenes 