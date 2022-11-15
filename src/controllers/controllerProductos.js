import ServiceProductos from '../services/serviceProductos.js'
const newServiceProductos = new ServiceProductos()

import {daoProducto } from '../index.js';

const getProductos = async (req, res) => {
    try { 
        const filtroBusqueda= req.params.id;
        let resultado = await newServiceProductos.serviceGetProductos(filtroBusqueda)

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
        const productoCreado= await newServiceProductos.servicePostProductos(producto)
        res.json(productoCreado)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const putProductos = async (req, res) => {
    try {
        const id = req.params.id;
        const actualizacionProducto= req.body
        const productoNuevo= await newServiceProductos.servicePutProductos(id, actualizacionProducto)  
        res.json('Producto Modificado Exitosamente' + productoNuevo)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const deleteProductos =async (req, res) => {
    try {  
        const id = req.params.id;
        let resp = await newServiceProductos.serviceDeleteProductos(id)
        res.json('Producto Eliminado Exitosamente' + resp)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
 }

export {getProductos, postProductos, putProductos, deleteProductos}