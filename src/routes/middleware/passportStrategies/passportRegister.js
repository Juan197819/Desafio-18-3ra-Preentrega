import passport from 'passport';
import fs from 'fs'
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
      try {
        await fs.promises.unlink(`./views/img/avatares/${req.file.filename}`)
        console.log('Borrado de avatar exitoso')
      } catch (err) {
        logueoError(`Error al borrar imagen: ${err} `)
      }
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
    const usuarioNuevo= {username: username}
    return done(null, usuarioNuevo)
  }))  

const passportAuthRegister =passport.authenticate('register',{failureRedirect:'/register/error'})  

export default passportAuthRegister