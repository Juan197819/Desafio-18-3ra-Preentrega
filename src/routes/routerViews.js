import { Router} from "express";
import upload from "./middleware/uploadAvatarImage.js";
import {logueoInfo} from '../config/confWinston.js';
import {getRegister, postRegister, getRegisterError, getLogin, postLogin, getLoginError, getLogout, getIndexHome, getHome, getHomePerfil} from '../controllers/controllerViews.js'
import passportAuthRegister from "./middleware/passportStrategies/passportRegister.js";
import passportAuthLogin from "./middleware/passportStrategies/passportLogin.js";
import auth from "./middleware/auth.js" 

const routerRegister = new Router();
const routerLogin  = new Router();
const routerLogout  = new Router();
const routerHome = new Router();

routerRegister.get('/', logueoInfo, getRegister)  
routerRegister.post('/', upload.single('imagen'), passportAuthRegister, logueoInfo, postRegister)  
routerRegister.get('/error', logueoInfo, getRegisterError) 

routerLogin.get('/', logueoInfo, getLogin)  
routerLogin.post('/', upload.single('imagen'), passportAuthLogin, logueoInfo, postLogin)  
routerLogin.get('/error', logueoInfo, getLoginError) 

routerHome.get('', auth, logueoInfo, getIndexHome)
routerHome.get('/centroMensajes', auth, logueoInfo, getHome)
routerHome.get('/perfil', auth, logueoInfo, getHomePerfil)

routerLogout.get('/', auth, logueoInfo, getLogout) 

export {routerRegister, routerLogin, routerLogout, routerHome}