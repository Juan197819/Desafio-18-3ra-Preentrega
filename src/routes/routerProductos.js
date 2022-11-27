import { Router} from "express";
import {getProductos, postProductos, putProductos, deleteProductos} from '../controllers/controllerProductos.js'
import adminok from "./middleware/admin.js";
import uploadProduct from "./middleware/uploadProductImage.js";

const routerProductos = new Router(); 

routerProductos.get('/:id?', getProductos)
routerProductos.post('/', adminok, uploadProduct.single('foto'), postProductos)
routerProductos.put('/:id', adminok, uploadProduct.single('foto'), putProductos)
routerProductos.delete('/:id', adminok, deleteProductos);

export default routerProductos