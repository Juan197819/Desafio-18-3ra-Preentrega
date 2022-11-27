import { Router} from "express";
import upload from "../routes/middleware/uploadAvatarImage.js";
import {logueoInfo} from '../config/confWinston.js';
import {getRegister, getHome, getRegisterError, getLogin, getLoginError, getLogout} from '../controllers/controllerViews.js'
import passportAuthRegister from "./middleware/passportStrategies/passportRegister.js";
import passportAuthLogin from "./middleware/passportStrategies/passportLogin.js";
import auth from "./middleware/auth.js" 

const routerRegister = new Router();
const routerLogin  = new Router();
const routerLogout  = new Router();
const routerHome = new Router();

routerRegister.get('/', logueoInfo, getRegister)  
routerRegister.get('/error', logueoInfo, getRegisterError) 

routerLogin.get('/', logueoInfo, getLogin)  
routerLogin.post('/',logueoInfo, passportAuthLogin )  
routerLogin.get('/error', logueoInfo, getLoginError) 

routerHome.get('/:home?/:perfil?', auth,  logueoInfo, getHome)

routerLogout.get('/', auth, logueoInfo, getLogout) 

export {routerRegister, routerLogin, routerLogout, routerHome}