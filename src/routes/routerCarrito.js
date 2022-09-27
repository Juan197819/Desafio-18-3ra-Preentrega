import { Router, json, urlencoded} from "express";
import {getProductosCarrito, getCarrito, postCarrito, postProductosCarrito, deleteCarrito, deleteProductoCarrito} from '../controllers/controllerCarrito.js'
const routerCarrito = new Router(); 

routerCarrito.use(json());
routerCarrito.use(urlencoded({ extended: true }));

routerCarrito.post('/', postCarrito)
//CREAR CARRITO Y DEVOLVER ID
routerCarrito.delete('/:id', deleteCarrito)
//VACIAR CARRITO Y ELIMINAR
routerCarrito.get('/:id/productos', getProductosCarrito)
//LISTAR PROD GUARDADOS EN CARRITO
routerCarrito.get('/:id?', getCarrito) 
routerCarrito.post('/:id/productos', postProductosCarrito)
//AGREGAR PROD AL CARRITO X ID DE PROD
routerCarrito.delete('/:id/productos/:id_prod', deleteProductoCarrito)
//ELIMINAR PROD DEL CARRITO X ID DE CARRITO Y DE PROD
export default routerCarrito