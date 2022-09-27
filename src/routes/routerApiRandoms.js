import { Router, json, urlencoded } from "express";
import getNumRandom from '../controllers/controllerApiRandom.js'
import {logueoInfo}from '../config/confWinston.js';

const routerApiRandoms = new Router(); 

routerApiRandoms.use(json())
routerApiRandoms.use(urlencoded({extended: true})) 

//-------------GET DE NUMEROS ALEATORIOS -----------

routerApiRandoms.get('/', logueoInfo, getNumRandom)

export default routerApiRandoms