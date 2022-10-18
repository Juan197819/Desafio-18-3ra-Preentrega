import {daoUsuario } from '../index.js';
import fs from 'fs'

const getUsuarios = async (req, res) => {
    let filtro;
    try { 
        const id= req.params.id;
        if (id) {
            filtro = id
        } else if(req.user){
            filtro= {
                username: req.session.user
            }
        }
        let resultado = await daoUsuario.leer(filtro)

        if (!resultado.length) {
            res.json("Usuario no existente")
        }else{
            res.json(resultado);
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const postUsuarios = async (req, res) => {
    try {
        let usuario = req.body
        prod = await daoUsuario.guardar(usuario)
        res.json('Usuario Creado Exitosamente')
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const putUsuarios = async (req, res) => {
    console.log('ADENTRO DE PUTUSUARIOS');
    const id = req.params.id;
    try {
        let isExist = await daoUsuario.leer(id)
        if (!isExist.length) {
            res.json("Producto no existente (metodo PUT)")
        }else{
            let newData
            if (req.file) {
                try {
                    await fs.promises.unlink(`./views/img/avatares/${isExist[0].urlImagen}`)
                } catch (error) {
                    console.log('Error borrando imagen anterior' + error);
                    new Error (error)
                }
                newData={   
                    urlImagen:req.file.filename,
                }
            } else {
                newData=req.body
                req.session.user= req.body.username
            }

            await daoUsuario.modificar(...isExist, newData,'$set')
            res.json('Producto Modificado Exitosamente')
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const deleteUsuarios =async (req, res) => {
    try {  
        const id = req.params.id;
        let isExist = await daoUsuario.leer(id)
 
        if (!isExist.length) {
            res.json("Usuario no existente (metodo DELETE)")
        } else {
            const prod = await daoUsuario.eliminar(id)
            res.json('Usuario Eliminado Exitosamente')
        }
    } catch (error) {
     console.log(error)
     res.json(error)
    }
 }

export {getUsuarios, postUsuarios, putUsuarios, deleteUsuarios}