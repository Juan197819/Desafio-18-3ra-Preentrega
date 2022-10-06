import {logueoError} from '../../config/confWinston.js';

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('USUARIO AUTENTICADO') 
      next()
    }else{
      logueoError('USUARIO NO AUTENTICADO, DEBE LOGUEARSE')
      res.redirect('/login')
    }
  }

  export default auth