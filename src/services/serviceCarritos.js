import {daoCarrito, daoProducto } from '../index.js';
import productoDto from '../dtos/productoDto.js';

class ServiceCarritos {
    constructor(){

    }
    async serviceGetProductosCarrito(id){
        try {
            let carritoActual= await daoCarrito.leer(id)
            let o = {}
            let datoCarrito = []
            let productos= carritoActual[0].productos
            if (!carritoActual.length||!productos) {
                return ("Carrito Inexistente (METODO GET)") 
            } else {
                productos.sort((a, b)=> {
                    if (a.nombre > b.nombre) {
                      return 1;
                    }
                    if (a.nombre < b.nombre) {
                      return -1;
                    }
                    return 0;
                  });
                productos.forEach(p=>{
                    const id = p._id
                    if ( !o[id] ) {
                        o[id] = p._id
                        let newProduct=productoDto(p)
                        datoCarrito.push(newProduct)
                    }else{
                        datoCarrito.forEach(p => {
                            if (p._id==o[id]) {
                                p.cantidad= p.cantidad + 1
                            }
                        })
                    }
                })
                return (datoCarrito)
            }
        } catch (error) {
            throw ('Error obteniendo productos del carrito: '+ error)
        }
    }
    async serviceGetCarrito(id){
        try {
            return await daoCarrito.leer(id)
        } catch (error) {
            throw ('Error creando carrito Nuevo: '+ error)
        }
    }
    async servicePostCarrito () {
        const nuevoCarrito = {
            timestamp: Date.now(), 
            productos: [],
        }
        try {
            const carritoAgregado = await daoCarrito.guardar(nuevoCarrito)
            console.log('Carrito creado con exito')
            return (carritoAgregado._id)
        } catch (error) {
            throw ('Error creando carrito Nuevo: '+ error)
        }
    }
    async servicePostProductosCarrito(id, idCarrito){
        try {
            let [product] = await daoProducto.leer(id)
           let [carritoActual]= await daoCarrito.leer(idCarrito)
           if (!product) throw ('Producto inexistente')
           if (!carritoActual) throw ('Carrito inexistente')
            const response = await daoCarrito.modificar(carritoActual,{productos: product},'$push')
            return response
        } catch (error) {
            throw ('Error agregando producto a carrito: '+ error)
        }
    }
    async serviceDeleteCarrito(id){
        try {
            const carritoEnUso= await daoCarrito.leer(id)
            if (!carritoEnUso.length) {
                throw  ("Carrito Inexistente, imposible borrarlo")
            } else {
                // 1ro VACIADO DE CARRITO
                await daoCarrito.modificar(...carritoEnUso,{productos:[]},'$set')
                // 2do ELIMINACION DE CARRITO
                const carritoEliminado= await daoCarrito.eliminar(id)
                return 'Carrito Eliminado Correctamente'
            }   
        } catch (error) {
            throw ('Error borrando carrito: '+ error)
        }    
    }
    async serviceDeleteProductoCarrito (id, id_prod, cantidadEliminada) {
        try {
    
            let carritoActual= await daoCarrito.leer(id)
            if (!carritoActual.length) {
                throw ('Carrito Inexistente, imposible borrar productos')
            } else {
                const productos = carritoActual[0].productos
                const productoParaBorrar= productos.find(producto=>producto._id==id_prod)
                if (productoParaBorrar) {
                    let newCarrito
                    switch (cantidadEliminada) {
                        case 'restarUnidad':
                            for (let i = 0; i < productos.length; i++) {
                                const p = productos[i];
                                if (p._id==id_prod) {
                                    productos.splice(i,1)
                                    newCarrito=productos
                                    break
                                }   
                            }  
                        break;
                        case 'removerItem':
                            newCarrito= productos.filter(producto=>producto._id!=id_prod)
                        break;
                        default:
                            newCarrito= productos.filter(producto=>producto._id!=id_prod)
                        break;

                    }                   
                    await daoCarrito.modificar({_id:id}, {productos:newCarrito},'$set')
                    return ('Producto Eliminado del Carrito Correctamente')
                } else throw ('Producto Inexistente, elija otro producto del carrito para borrar')
            }
        } catch (error) {
           throw ('error deleteProductoCarrito: ', error)
        }
    }
}
export default ServiceCarritos 