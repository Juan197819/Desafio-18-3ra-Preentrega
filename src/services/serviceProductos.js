import { daoProducto } from '../index.js';
import productoDto from '../dtos/productoBDDto.js';
import fs from 'fs'

class ServiceProductos {

    async serviceGetProductos(filtroProducto){
        try {
            return await daoProducto.leer(filtroProducto)
        } catch (error) {
            throw ('Error obteniendo Producto/s: '+ error)
        }
    }
    async servicePostProductos (producto, urlImagen) {
        try {
            producto.timestamp= Date.now()
            const productoNuevo = productoDto(producto,urlImagen)
            const productoAgregado = await daoProducto.guardar(productoNuevo)
            return (productoAgregado._id)
        } catch (error) {
            throw ('Error creando Productos Nuevo: '+ error)
        }
    }
    async servicePutProductos(id, newProduct){
        try {
            if (!id) throw ("Se requiere ID de producto para modificarlo")
            let isExist = await daoProducto.leer(id)
            if (!isExist.length) throw ("Producto no existente (metodo PUT)")              
            newProduct.timestamp= Date.now()
            if(newProduct.foto){
                try {
                    await fs.promises.unlink(`./views/img/${isExist[0].foto}`)
                    console.log('Imagen de producto anterior BORRADO exitosamente');
                } catch (error) {
                    console.log('Error borrando imagen anterior' + error);
                }
            }
            return await daoProducto.modificar(...isExist,newProduct,'$set')
        } catch (error) {
            throw ('Error modificando Producto: '+ error)
        }
    }
    async serviceDeleteProductos(id){
        try {  
            let isExist = await daoProducto.leer(id)
            if (!isExist.length) {
                throw("Producto no existente")
            } else {
                const prod = await daoProducto.eliminar(id)
                try {
                    await fs.promises.unlink(`./views/img/${isExist[0].foto}`)
                    console.log('BORRADO de Imagen de producto exitoso');
                } catch (error) {
                    console.log('Error borrando imagen de producto' + error);
                }
                return (prod)
            }
        } catch (error) {
            throw ('Error Eliminando Producto: '+ error)
        }
     }
    }
export default ServiceProductos 