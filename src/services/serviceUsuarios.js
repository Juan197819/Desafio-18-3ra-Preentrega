import { daoUsuario } from '../index.js';
import usuarioDto from '../dtos/usuarioDto.js';
import envioMail, {datosUsuarioNuevo} from '../config/configMail.js'
import fs from 'fs'

class ServiceUsuarios {

    async serviceGetUsuarios(filtroUsuario){
        try {
            return await daoUsuario.leer(filtroUsuario)
        } catch (error) {
            throw ('Error obteniendo Usuario/s: '+ error)
        }
    }
    async servicePostUsuarios (datosPersonales,urlImagen) {
        try {
            const usuarioNuevo = usuarioDto(datosPersonales,urlImagen)
            const usuarioAgregado = await daoUsuario.guardar(usuarioNuevo)
            envioMail('Nuevo Registro' , datosUsuarioNuevo(usuarioNuevo))
            return (usuarioAgregado._id)
        } catch (error) {
            throw ('Error creando Usuarios Nuevo: '+ error)
        }
    }
    async servicePutUsuarios(id, avatar, datosNuevos){
        try {
            if (!id) throw ("Se requiere ID de usuario para modificarlo")
            let isExist = await daoUsuario.leer(id)
            if (!isExist.length) throw ("Usuario no existente")
            let newData
            if (avatar) {
                try {
                    console.log(avatar);
                    console.log(isExist);
                    console.log(isExist[0].urlImagen);
                    await fs.promises.unlink(`./views/img/avatares/${isExist[0].urlImagen}`)
                    console.log('Avatar anterior BORRADO exitosamente');
                } catch (error) {
                    throw('Error borrando imagen anterior' + error);
                        (error)
                }
                newData={   
                    urlImagen:avatar.filename,
                }
            } else {
                newData=datosNuevos
            }
            await daoUsuario.modificar(...isExist, newData,'$set')
            return(newData)
        } catch (error) {
            throw ('Error modificando Usuario: '+ error)
        }
    }
    async serviceDeleteUsuarios(id){
        try {  
            let isExist = await daoUsuario.leer(id)
            if (!isExist.length) {
                throw("Usuario no existente")
            } else {
                const prod = await daoUsuario.eliminar(id)
                return ('Usuario Eliminado Exitosamente' + prod)
            }
        } catch (error) {
            throw ('Error Eliminando Usuario: '+ error)
        }
     }
    }
export default ServiceUsuarios 