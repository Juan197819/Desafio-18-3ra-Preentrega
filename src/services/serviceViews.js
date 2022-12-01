import { daoUsuario } from '../index.js';
import {arg} from '../config/configEntorno.js'
import {cpus as numCPUS} from 'os'

function calcularEdad(fecha) {     
  let hoy = new Date();
  let cumpleanos = new Date(fecha);
  let edad = hoy.getFullYear() - cumpleanos.getFullYear();
  let m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  return edad;
}
  
export async function serviceViews (buscarUsuario){
  const [usuario] = await daoUsuario.leer(buscarUsuario)
  return {
    nombre: usuario.nombre.toUpperCase(),
    urlImagen:usuario.urlImagen, 
    edad: calcularEdad(usuario.fechaNacimiento),
    apellido: usuario.apellido.toUpperCase(), 
    email:usuario.username, 
    telefono:usuario.telefono, 
  }
}
export async function serviceInfo (){
  return {
    argumentos: JSON.stringify(arg),
    sistema:process.platform,
    versionNode:process.version,  
    memoria:process.memoryUsage().rss,
    pathEjecucion:process.execPath,
    proccessId:process.pid,
    carpetaProyecto:process.cwd(),
    cantProcesadores:numCPUS().length
  }
}
