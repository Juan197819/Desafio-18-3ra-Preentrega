import { daoProducto } from '../index.js';
import productoDto from '../dtos/productoDto.js';

class ServiceProductos {

    async serviceGetProductos(filtroProducto){
        try {
            return await daoProducto.leer(filtroProducto)
        } catch (error) {
            throw ('Error obteniendo Producto/s: '+ error)
        }
    }
    async servicePostProductos (producto) {
        try {
            producto.timestamp= Date.now()
            const ProductoAgregado = await daoProducto.guardar(producto)
            return (ProductoAgregado._id)
        } catch (error) {
            throw ('Error creando Productos Nuevo: '+ error)
        }
    }
    async servicePutProductos(id, newProduct){
        try {
            let isExist = await daoProducto.leer(id)
            if (!isExist.length) throw ("Producto no existente (metodo PUT)")              
            newProduct.timestamp= Date.now()
            await daoProducto.modificar(...isExist,newProduct,'$set')
            console.log('Producto Modificado Exitosamente');
            return newProduct
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
                return (prod)
            }
        } catch (error) {
            throw ('Error Eliminando Producto: '+ error)
        }
     }
    }
export default ServiceProductos 