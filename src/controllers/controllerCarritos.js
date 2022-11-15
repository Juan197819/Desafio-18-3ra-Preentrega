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
const getCarritos = async(req, res) => {
    try {
        const id = req.params.id
        let carrito = await newServiceCarrito.serviceGetCarritos(id)
        res.json(carrito)
    } catch (error) {
        console.log('error getCarritos: ', error)
        res.json( {error})
    }
}
const postCarritos = async (req, res) => {
    try {
        const idNewCarrito = await newServiceCarrito.servicePostCarritos()
        res.json(idNewCarrito)
    } catch (error) {
        console.log('error postCarritos: ', error)
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
const deleteCarritos = async (req, res) => {
    try {
        const id = req.params.id
        const resp = await newServiceCarrito.serviceDeleteCarritos(id)
        res.json(resp)
    } catch (error) {
        console.log('error deleteCarritos: ', error)
        res.json( {error})
    }    
}
const deleteProductosCarrito = async(req, res) => {
    try {
        let id =req.params.id;
        let id_prod =req.params.id_prod;
        let cantidadEliminada =req.params.cantidadEliminada;
        const resp = await newServiceCarrito.serviceDeleteProductosCarrito(id, id_prod, cantidadEliminada)
        res.json(resp)
    } catch (error) {
        console.log('error deleteProductosCarrito: ', error)
        res.json( {error})
    }
}

export {getProductosCarrito, getCarritos, postCarritos, postProductosCarrito, deleteCarritos, deleteProductosCarrito}