function ordenDto(emailComprador, numOrden, ordenProductos, fyh){
    return {
        nombreComprador:ordenProductos.nombreCompleto,
        emailComprador,
        numOrden,
        productos: ordenProductos.carrito,
        fyh,
        estado: 'generada'
    }
}
export default ordenDto