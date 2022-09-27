import { Router, json, urlencoded} from "express";
import {getProductos, postProductos, putProductos, deleteProductos} from '../controllers/controllerProductos.js'
import adminok from "./middleware/admin.js";

const routerProductos = new Router(); 
routerProductos.use(json());
routerProductos.use(urlencoded({ extended: true }));

// let prod = productosLista; 

routerProductos.get('/:id?', getProductos)
routerProductos.post('/', adminok, postProductos)
routerProductos.put('/:id', adminok, putProductos)
routerProductos.delete('/:id', adminok, deleteProductos);

export default routerProductos