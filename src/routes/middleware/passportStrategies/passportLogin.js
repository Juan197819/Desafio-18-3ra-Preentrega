import passport from 'passport';
import bcrypt from 'bcrypt';
import {Strategy as LocalStrategy} from 'passport-local';
import ServiceUsuarios from '../../../services/serviceUsuarios.js'
import {logueoError} from '../../../config/confWinston.js';
const newServiceUsuario = new ServiceUsuarios()
 
passport.use('login', new LocalStrategy( 
    async (username,password,done)=>{
        let user;
        try {
            [user] = await newServiceUsuario.serviceGetUsuarios({username}) 
        } catch (error) {
            logueoError('Este es  el error al leer usuario en logueo: ', error) 
            return done(null, false)
        }
        if(!user || !bcrypt.compareSync(password, user.password)){
            logueoError('Usuario no encontrado')
            return done(null, false)
        }
        console.log('LOGUEO EXITOSO')
        return done(null, user)
    }
)) 

const passportAuthLogin=  passport.authenticate('login',{failureRedirect:'/login/error', successRedirect: '/home'})

export default passportAuthLogin
