let administrador=true;

const adminok= (req, res,next)=>{
    if (administrador) {
        console.log('Usuario Habilitado')
        next()
    }else{
        console.log('Usuario No valido');
        res.json({error: -1, descripcion: 'ruta /api/productos metodo no valido'})
    }
}

export default adminok