import ServiceOrdenes from '../services/serviceOrdenes.js'
const newServiceOrdenes = new ServiceOrdenes()

const getOrdenes = async (req, res) => {
    // try { 
    //     const id= req.params.id;
    //     let resultado = await daoOrden.leer(id)

    //     if (!resultado.length) {
    //         res.json("Orden no existente")
    //     }else{
    //         res.json(resultado);
    //     }
    // } catch (error) {
    //     console.log(error)
    //     res.json(error)
    // }
}
const postOrdenes = async (req, res) => {
    try {
        let orden = req.body
        let emailComprador = req.params.usuario
        const nuevoId= await newServiceOrdenes.servicePostOrdenes(orden, emailComprador)    
        console.log('Solicitud procesada, orden N°: ' + nuevoId)
        res.redirect('/centroMensajes')
    } catch (error) {
        console.log('Error postUsuarios: ', error)
        res.json({error})
    }

}
const putOrdenes = async (req, res) => {
    // try {
    //     const id = req.params.id;
    //     let isExist = await daoOrden.leer(id)
    //     if (!isExist.length) {
    //         res.json("Orden no existente (metodo PUT)")
    //     }else{
    //         const newProduct= req.body
    //         newProduct.timestamp= Date.now()
    //         const OrdenModificado = await daoOrden.modificar(...isExist,newProduct,'$set')
    //         res.json('Orden Modificado Exitosamente')
    //     }
    // } catch (error) {
    //     console.log(error)
    //     res.json(error)
    // }
}
const deleteOrdenes =async (req, res) => {
    // try {  
    //     const id = req.params.id;
    //     let isExist = await daoOrden.leer(id)
 
    //      if (!isExist.length) {
    //          res.json("Orden no existente (metodo DELETE)")
    //      } else {
    //          const prod = await daoOrden.eliminar(id)
    //          res.json('Orden Eliminado Exitosamente')
    //      }
    // } catch (error) {
    //  console.log(error)
    //  res.json(error)
    // }
 }

export {getOrdenes, postOrdenes, putOrdenes, deleteOrdenes}