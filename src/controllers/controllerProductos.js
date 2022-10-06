import {daoProducto } from '../index.js';

const getProductos = async (req, res) => {
    try { 
        const id= req.params.id;
        let resultado = await daoProducto.leer(id)

        if (!resultado.length) {
            res.json("Producto no existente")
        }else{
            res.json(resultado);
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const postProductos = async (req, res) => {
    try {
        let producto = req.body
        producto.timestamp= Date.now()
        prod = await daoProducto.guardar(producto)
        res.json('Producto Creado Exitosamente')
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const putProductos = async (req, res) => {
    try {
        const id = req.params.id;
        let isExist = await daoProducto.leer(id)
        if (!isExist.length) {
            res.json("Producto no existente (metodo PUT)")
        }else{
            const newProduct= req.body
            newProduct.timestamp= Date.now()
            const productoModificado = await daoProducto.modificar(...isExist,newProduct,'$set')
            res.json('Producto Modificado Exitosamente')
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const deleteProductos =async (req, res) => {
    try {  
        const id = req.params.id;
        let isExist = await daoProducto.leer(id)
 
         if (!isExist.length) {
             res.json("Producto no existente (metodo DELETE)")
         } else {
             const prod = await daoProducto.eliminar(id)
             res.json('Producto Eliminado Exitosamente')
         }
    } catch (error) {
     console.log(error)
     res.json(error)
    }
 }

export {getProductos, postProductos, putProductos, deleteProductos}