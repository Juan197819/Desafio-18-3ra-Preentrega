import {daoUsuario} from '../index.js'
import { logueoError } from '../config/confWinston.js'

const getRegister = (req, res) => {
    res.render("register")
}
const postRegister = (req, res) => {
    const nombreMayus= req.body.nombre.toUpperCase()
    req.session.nombre= nombreMayus
    req.session.urlImagen=req.file.filename
    req.session.edad=req.body.edad
    req.session.apellido= req.body.apellido.toUpperCase()
  
    res.redirect('/centroMensajes')
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
const postLogin = async (req, res) => {
  const [{nombre,urlImagen,edad,apellido}]= await daoUsuario.leer({username: req.body.username})
  const nombreMayus= nombre.toUpperCase()
  req.session.nombre= nombreMayus
  req.session.urlImagen= urlImagen
  req.session.edad= edad
  req.session.apellido= apellido.toUpperCase()
  res.redirect('/centroMensajes')
}
const getLoginError = (req, res) => {
    res.render("loginError")
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
const getIndexHome =  (req, res) => {
  res.redirect('/centroMensajes')
}
const getHome =   (req, res) => {
  const usuario = {
    nombre:req.session.nombre,
    urlImagen:req.session.urlImagen, 
    edad:req.session.edad,
    apellido:req.session.apellido, 
    email:req.user,  
  }
  let carritoExist= req.params.carrito
  if (carritoExist) {
    carritoExist = true
  } else {
    carritoExist = false
  }
  res.render("centroMensajes",{...usuario,carritoExist});
}

const getHomePerfil = (req, res) => {
  
}

export {getRegister, postRegister, getRegisterError, getLogin, postLogin, getLoginError, getLogout, getIndexHome, getHome, getHomePerfil}