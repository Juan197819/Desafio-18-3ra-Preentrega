import {Router} from "express";
import {getProductosCarrito, getCarrito, postCarrito, postProductosCarrito, deleteCarrito, deleteProductoCarrito} from '../controllers/controllerCarrito.js'
const routerCarrito = new Router(); 

//LISTAR PROD GUARDADOS EN CARRITO
routerCarrito.get('/:id/productos', getProductosCarrito)
//LISTAR CARRITOS COMPLETOS
routerCarrito.get('/:id?', getCarrito) 
//CREAR CARRITO Y DEVOLVER ID
routerCarrito.post('/', postCarrito)
//AGREGAR PROD AL CARRITO X ID DE PROD
routerCarrito.post('/:id/productos', postProductosCarrito)
//VACIAR CARRITO Y ELIMINAR
routerCarrito.delete('/:id', deleteCarrito)
//ELIMINAR PROD DEL CARRITO X ID DE CARRITO Y DE PROD
routerCarrito.delete('/:id/productos/:id_prod/:cantidadEliminada?', deleteProductoCarrito)
export default routerCarrito