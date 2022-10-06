import {daoCarrito, daoProducto } from '../index.js';

const getProductosCarrito = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        let carritoActual= await daoCarrito.leer(id)
        console.log('carritoActual')
        console.log(carritoActual)
        console.log('carritoActual')
        if (!carritoActual.length) {
            res.json("Carrito Inexistente (METODO GET)") 
        } else {
            [carritoActual]=carritoActual
            res.json(carritoActual.productos)
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const getCarrito = async(req, res) => {
    try {
        res.json(await daoCarrito.leer(req.params.id))
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const postCarrito = async (req, res) => {
    try {
        const nuevoCarrito = {
            timestamp: Date.now(), 
            productos: [],
        }
        const carritoAgregado = await daoCarrito.guardar(nuevoCarrito)
        console.log('Carrito creado con exito')
        res.json(carritoAgregado._id)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const postProductosCarrito = async(req, res) => {
    try {
        const id = req.params.id
        let idCarrito = req.body.idCarrito

        let [product] = await daoProducto.leer(id)
        let [carritoActual]= await daoCarrito.leer(idCarrito)

        let newProduct={
            id: product._id,
            nombre: product.nombre,
            precio: product.precio,
            foto: product.foto,
            codigo: product.codigo,
            cantidad: 1,
        }
        console.log(newProduct)
        for (let i = 0; i < carritoActual.productos.length; i++) {
            const p = carritoActual.productos[i];
            if (p==product) {
                newProduct.cantidad= newProduct.cantidad + 1
            }
        }
            
        const actualizacionDeCarrito= await daoCarrito.modificar(carritoActual,{productos: product},'$push')
        // actualizacionDeCarrito2= await daoCarrito.modificar(carritoActual,{productos: product},'$set')
        console.log('carritoNuevo')
        console.log(carritoActual)
        console.log('carritoNuevo')
        res.json("Producto agregado al Carrito")
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const deleteCarrito = async (req, res) => {
    try {
        const id = req.params.id
        // 1ro VACIADO DE CARRITO
        const carritoEnUso= await daoCarrito.leer(id)
        if (!carritoEnUso.length) {
            res.json("Carrito Inexistente, imposible borrarlo")
        } else {
            const VaciadoDeCarrito= await daoCarrito.modificar(...carritoEnUso,{productos:[]},'$set')
            // 2do ELIMINACION DE CARRITO
            const carritoEliminado= await daoCarrito.eliminar(id)
            console.log(carritoEliminado)
            res.json('Carrito Eliminado Correctamente')
        }   
    } catch (error) {
        console.log(error)
        res.json(error)
    }    
}
const deleteProductoCarrito = async(req, res) => {
    try {
        let id =req.params.id;
        console.log(id)
        let id_prod =req.params.id_prod;
        console.log(id_prod)    
        let carritoActual= await daoCarrito.leer(id)
        if (!carritoActual.length) {
            res.json('Carrito Inexistente, imposible borrar productos')
        } else {

            const productoParaBorrar= carritoActual[0].productos.find(producto=>producto._id==id_prod)

            if (productoParaBorrar) {
                const newCarrito= carritoActual[0].productos.filter(producto=>producto._id!=id_prod)
                let carritoActual2= await daoCarrito.modificar(...carritoActual, {productos:newCarrito},'$set')

                console.log(carritoActual2)
                res.json('Producto Eliminado del Carrito Correctamente')
            } else {
                res.json('Producto Inexistente, elija otro producto del carrito para borrar')
            }
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

export {getProductosCarrito, getCarrito, postCarrito, postProductosCarrito, deleteCarrito, deleteProductoCarrito}