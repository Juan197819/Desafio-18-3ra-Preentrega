function productoDto(dato,urlImagen){
    return {
        timestamp: dato.timestamp,
        nombre: dato.nombre,
        descripcion: dato.descripcion,
        codigo: dato.codigo,
        foto: urlImagen,
        precio: dato.precio,
        stock: dato.stock
    }
}
export default productoDto