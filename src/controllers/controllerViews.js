import {daoUsuario} from '../index.js'
import { logueoError } from '../config/confWinston.js'

function calcularEdad(fecha) {     
  //console.log(fecha)
  let hoy = new Date();
  let cumpleanos = new Date(fecha);
  let edad = hoy.getFullYear() - cumpleanos.getFullYear();
  let m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  //console.log(edad)
  return edad;
}
const getRegister = (req, res) => {
    res.render("register")
}
const getRegisterError = (req, res) => {
    res.render("registerError")
}
const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/centroMensajes')
  }else{
    res.render("login")
  }
}
const getLoginError = (req, res) => {
    res.render("errorLogin")
}
const getLogout = (req, res) => {
    req.session.destroy((err)=>{
      if (!err) {
        setTimeout(()=>{
         return res.redirect('login') 
        },2000) 
      } else {
        logueoError('Este es el error en LOGOUT: ', err)
          res.send('ERROR EN LOGOUT', err )
      }    
      console.log('Te deslogueaste con exito')
    })
}
const getCentroMensajes = async (req, res) => {
if(!req.session.user){
  req.session.user=req.user
}
  console.log('req.session');
  const [user] = await daoUsuario.leer({username: req.session.user})
  const usuario = {
    nombre: user.nombre.toUpperCase(),
    urlImagen:user.urlImagen, 
    edad: calcularEdad(user.fechaNacimiento),
    apellido: user.apellido.toUpperCase(), 
    email:user.username  
  }
  let perfilExist= req.url
  if (perfilExist=='/centroMensajes/perfil') {
    perfilExist = false
  } else {
    perfilExist = true
  }
  res.render("centroMensajes",{...usuario,perfilExist});
}

export {getRegister, getCentroMensajes, getRegisterError, getLogin, getLoginError, getLogout}