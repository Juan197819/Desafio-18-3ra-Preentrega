import bcrypt from 'bcrypt';

function usuarioDto(dato,urlImagen){
    return {
        nombre:dato.nombre.toUpperCase(),
        apellido:dato.apellido.toUpperCase(),
        fechaNacimiento: `${dato.anio},${dato.mes},${dato.dia}`,
        direccion:dato.direccion.toUpperCase(),
        urlImagen,
        telefono: dato.phone,
        username: dato.username.toLowerCase(),
        password: bcrypt.hashSync(dato.password, bcrypt.genSaltSync(10))
    }
}
export default usuarioDto
