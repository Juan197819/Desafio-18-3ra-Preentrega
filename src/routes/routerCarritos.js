import {Router} from "express";
import {getProductosCarrito, getCarritos, postCarritos, postProductosCarrito, deleteCarritos, deleteProductosCarrito} from '../controllers/controllerCarritos.js'
const routerCarritos = new Router(); 

//LISTAR PROD GUARDADOS EN CARRITO
routerCarritos.get('/:id/productos', getProductosCarrito)
//LISTAR CARRITOS COMPLETOS
routerCarritos.get('/:id?', getCarritos) 
//CREAR CARRITO Y DEVOLVER ID
routerCarritos.post('/', postCarritos)
//AGREGAR PROD AL CARRITO X ID DE PROD
routerCarritos.post('/:id/productos', postProductosCarrito)
//VACIAR CARRITO Y ELIMINAR
routerCarritos.delete('/:id', deleteCarritos)
//ELIMINAR PROD DEL CARRITO X ID DE CARRITO Y DE PROD
routerCarritos.delete('/:id/productos/:id_prod/:cantidadEliminada?', deleteProductosCarrito)
export default routerCarritos