import { Router} from "express";
import {getProductos, postProductos, putProductos, deleteProductos} from '../controllers/controllerProductos.js'
import adminok from "./middleware/admin.js";

const routerProductos = new Router(); 

routerProductos.get('/:id?', getProductos)
routerProductos.post('/', adminok, postProductos)
routerProductos.put('/:id', adminok, putProductos)
routerProductos.delete('/:id', adminok, deleteProductos);

export default routerProductos