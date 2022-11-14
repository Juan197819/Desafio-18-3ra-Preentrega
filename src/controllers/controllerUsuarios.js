import ServiceUsuarios from '../services/serviceUsuarios.js';
const newServiceUsuario = new ServiceUsuarios()

const getUsuarios = async (req, res) => {
    try { 
        let filtroUsuario=req.params.id||req.user&&{username: req.session.user}
        let usuarios = await newServiceUsuario.serviceGetUsuarios(filtroUsuario)
        if (!usuarios.length) {
            res.json("Usuario no existente")
        }else{
            res.json(usuarios);
        }
    } catch (error) {
        console.log('Error getUsuarios: ', error)
        res.json({error})
    }
}
const postUsuarios = async (req, res) => {

    try {
        const datosPersonales = req.body
        const urlImagen = req.file.filename
        const nuevoId= await newServiceUsuario.servicePostUsuarios(datosPersonales,urlImagen)    
        console.log('REGISTRO EXITOSO: ' + nuevoId)
        res.redirect('/centroMensajes')
    } catch (error) {
        console.log('Error postUsuarios: ', error)
        res.json({error})
    }
}
const putUsuarios = async (req, res) => {
    try {
        const id = req.params.id;
        const avatar = req.file
        const datosNuevos = req.body
        const newData= await newServiceUsuario.servicePutUsuarios(id,avatar,datosNuevos)  
        if (!avatar) req.session.user= datosNuevos.username
        res.json('Usuario Modificado Exitosamente')
    } catch (error) {
        console.log('Error putUsuarios: ', error)
        res.json({error})
    }
}

const deleteUsuarios =async (req, res) => {
    try {  
        const id = req.params.id;
        const response= await newServiceUsuario.serviceDeleteUsuarios(id)    
        res.json(response)
    } catch (error) {
        console.log('Error deleteUsuarios: ', error)
        res.json({error})
    }
 }

export {getUsuarios, postUsuarios, putUsuarios, deleteUsuarios}