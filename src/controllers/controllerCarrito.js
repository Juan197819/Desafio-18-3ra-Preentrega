import ServiceCarritos from '../services/serviceCarritos.js'

const newServiceCarrito = new ServiceCarritos()

const getProductosCarrito = async (req, res) => {
    try {
        const id = req.params.id
        const resp= await newServiceCarrito.serviceGetProductosCarrito(id)
        res.json(resp)
    } catch (error) {
        console.log('error getProductosCarrito: ', error)
        res.json( {error})
    }
}
const getCarrito = async(req, res) => {
    try {
        const id = req.params.id
        let carrito = await newServiceCarrito.serviceGetCarrito(id)
        res.json(carrito)
    } catch (error) {
        console.log('error getCarrito: ', error)
        res.json( {error})
    }
}
const postCarrito = async (req, res) => {
    try {
        const idNewCarrito = await newServiceCarrito.servicePostCarrito()
        res.json(idNewCarrito)
    } catch (error) {
        console.log('error postCarrito: ', error)
        res.json( {error})
    }
}
const postProductosCarrito = async(req, res) => {
    try {
        const id = req.params.id
        let idCarrito = req.body.idCarrito
        const response = await newServiceCarrito.servicePostProductosCarrito(id, idCarrito)
        console.log(response);
        res.json("Producto agregado al Carrito")
    } catch (error) {
        console.log('error postProductosCarrito: ', error)
        res.json( {error})
    }
}
const deleteCarrito = async (req, res) => {
    try {
        const id = req.params.id
        const resp = await newServiceCarrito.serviceDeleteCarrito(id)
        res.json(resp)
    } catch (error) {
        console.log('error deleteCarrito: ', error)
        res.json( {error})
    }    
}
const deleteProductoCarrito = async(req, res) => {
    try {
        let id =req.params.id;
        let id_prod =req.params.id_prod;
        let cantidadEliminada =req.params.cantidadEliminada;
        const resp = await newServiceCarrito.serviceDeleteProductoCarrito(id, id_prod, cantidadEliminada)
        res.json(resp)
    } catch (error) {
        console.log('error deleteProductoCarrito: ', error)
        res.json( {error})
    }
}

export {getProductosCarrito, getCarrito, postCarrito, postProductosCarrito, deleteCarrito, deleteProductoCarrito}