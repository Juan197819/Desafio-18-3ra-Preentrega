import { Router} from "express";
import {getUsuarios, postUsuarios, putUsuarios, deleteUsuarios} from '../controllers/controllerUsuarios.js'
import upload from "./middleware/uploadAvatarImage.js";

const routerUsuarios = new Router(); 

routerUsuarios.get('/:id?', getUsuarios)
routerUsuarios.post('/', postUsuarios)
routerUsuarios.put('/:id', upload.single('imagen'), putUsuarios)
routerUsuarios.delete('/:id', deleteUsuarios);

export default routerUsuarios