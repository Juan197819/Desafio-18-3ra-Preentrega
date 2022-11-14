import { Router} from "express";
import {logueoInfo} from '../config/confWinston.js';
import {getUsuarios, postUsuarios, putUsuarios, deleteUsuarios} from '../controllers/controllerUsuarios.js'
import upload from "./middleware/uploadAvatarImage.js";
import passportAuthRegister from "./middleware/passportStrategies/passportRegister.js";

const routerUsuarios = new Router(); 

routerUsuarios.get('/:id?',logueoInfo, getUsuarios)
routerUsuarios.post('/', upload.single('imagen'), passportAuthRegister, postUsuarios)
routerUsuarios.put('/:id', upload.single('imagen'), putUsuarios)
routerUsuarios.delete('/:id', deleteUsuarios);

export default routerUsuarios