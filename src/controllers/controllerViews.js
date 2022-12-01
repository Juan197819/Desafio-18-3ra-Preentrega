import {serviceViews, serviceInfo} from '../services/serviceViews.js';
import { logueoError } from '../config/confWinston.js'

const getRegister = (req, res) => {
    res.render("register")
}
const getInfo = async (req, res) => {
  const info = await serviceInfo()
  res.render("info", info)
}
const getRegisterError = (req, res) => {
  res.render("registerError")
}
const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home')
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
const getHome = async (req, res) => {
  let perfilExist= req.url
  let crearProd
  if(!req.session.user){
    req.session.user=req.user
  }
  let buscarUsuario= {username:req.session.user}
  const vistaUsuario= await serviceViews(buscarUsuario)
  switch (perfilExist) {
    case '/home/perfil':
      perfilExist = false
      crearProd = false
      break;
    case '/home/crearProducto':
      perfilExist = false
      crearProd = true
      break;
    default:
      perfilExist = true
      crearProd = false
      break;
  }
  res.render("home",{...vistaUsuario, perfilExist, crearProd});
}

export {getRegister, getHome, getRegisterError, getLogin, getLoginError, getLogout, getInfo}