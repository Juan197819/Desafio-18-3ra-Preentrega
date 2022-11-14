import { Router} from "express";
import {getOrdenes, postOrdenes, putOrdenes, deleteOrdenes} from '../controllers/controllerOrdenes.js'
import adminok from "./middleware/admin.js";

const routerOrdenes = new Router(); 

routerOrdenes.get('/:id?', getOrdenes)
routerOrdenes.post('/:usuario', adminok, postOrdenes)
routerOrdenes.put('/:id', adminok, putOrdenes)
routerOrdenes.delete('/:id', adminok, deleteOrdenes);

export default routerOrdenes