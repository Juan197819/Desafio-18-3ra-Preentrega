import { Router} from "express";
import getNumRandom from '../controllers/controllerApiRandom.js'
import {logueoInfo}from '../config/confWinston.js';

const routerApiRandoms = new Router(); 

routerApiRandoms.get('/', logueoInfo, getNumRandom)

export default routerApiRandoms