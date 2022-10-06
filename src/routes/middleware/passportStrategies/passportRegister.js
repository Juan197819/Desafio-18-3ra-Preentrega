import passport from 'passport';
import fs from 'fs'
import bcrypt from 'bcrypt';
import {Strategy as LocalStrategy} from 'passport-local';
import {daoUsuario } from '../../../index.js';
import {logueoError} from '../../../config/confWinston.js';

passport.use('register', new LocalStrategy({
    passReqToCallback:true
    }, async (req,username,password,done)=>{
    let user;
    try {
      [user] = await daoUsuario.leer({username}) 
      console.log(`Lectura de registros correcta`)
    } catch (error) {
      logueoError(`Este es el error al leer registros de BD: ` , error)
    }
    if (user) {
      logueoError('Usuario ya registrado')
      try {
        await fs.promises.unlink(`./views/img/avatares/${req.file.filename}`)
        console.log('Borrado de avatar exitoso')
      } catch (error) {
        logueoError(`Error al borrar imagen: ${error} `)
      }
      return done(null, false)
    }
    
    const usuarioNuevo= {
      nombre:req.body.nombre,
      apellido:req.body.apellido,
      direccion:req.body.direccion,
      edad:req.body.edad,
      urlImagen:req.file.filename,
      telefono: req.body.phone,
      username: username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
    try {
     await daoUsuario.guardar(usuarioNuevo)
     console.log('REGISTRO EXITOSO')
    } catch (error) {
      logueoError('Este es  el error al guardar usuarioNuevo: ', error)
    }
    return done(null, usuarioNuevo)
  }))  

const passportAuthRegister =passport.authenticate('register',{failureRedirect:'/register/error'})  

export default passportAuthRegister