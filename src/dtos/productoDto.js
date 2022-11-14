function productoDto(p){
    return {
        _id: p._id,
        nombre: p.nombre,
        precio: p.precio,
        foto: p.foto,
        codigo: p.codigo,
        cantidad: 1
    }
}
export default productoDto