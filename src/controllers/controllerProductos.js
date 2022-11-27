import ServiceProductos from '../services/serviceProductos.js'
const newServiceProductos = new ServiceProductos()

const getProductos = async (req, res) => {
    try { 
        const filtroBusqueda= req.params.id;
        let productos = await newServiceProductos.serviceGetProductos(filtroBusqueda)
        if (!productos.length) {
            res.json("Producto no existente")
        }else{
            res.json(productos);
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const postProductos = async (req, res) => {
    try {
        let producto = req.body
        const urlImagen = req.file.filename
        const productoCreado= await newServiceProductos.servicePostProductos(producto, urlImagen)
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
        console.log('req.file?.filename');
        console.log(req.file?.filename);
        console.log('req.file?.filename');
        if (req.file) actualizacionProducto.foto = `../img/productos/${req.file.filename}`
        const resp= await newServiceProductos.servicePutProductos(id, actualizacionProducto)  
        res.json(resp)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}
const deleteProductos =async (req, res) => {
    try {  
        const id = req.params.id;
        let resp = await newServiceProductos.serviceDeleteProductos(id)
        res.json(`${resp}, id de producto eliminado: ${id}`)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
 }

export {getProductos, postProductos, putProductos, deleteProductos}