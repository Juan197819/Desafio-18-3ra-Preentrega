async function guardarPerfil(e, id){
    e.preventDefault()
    process(e)
    //GUARDADO DE NUEVOS VALUES DE FORM
    let perfil= { 
        nombre : document.getElementById('nombre').value.toUpperCase(),
        apellido : document.getElementById('apellido').value.toUpperCase(),
        fechaNacimiento:`${document.getElementById('anio').value},${document.getElementById('mes').value},${document.getElementById('dia').value}`,
        direccion : document.getElementById('direccion').value.toUpperCase(),
        telefono : document.getElementById('phone').value,
        username : document.getElementById('username').value.toLowerCase(),
    }
    //ACTUALIZACION DE USUARIO EN PERSISTENCIA
    try {
       await fetch(`/api/usuarios/${id}`,{
            method: 'PUT',
            body: JSON.stringify(perfil),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        alert('Datos Modificados Exitosamente' )
    } catch (error) {
        throw (error)
    }
    //ACTUALIZACION DE HEADER CON LOS NUEVOS DATOS PERSONALES
    document.querySelector('header div.divTitulo').innerHTML=`
    <h2 class="ingreso"><span class="ingreso" id="saludo">Bienvenido/a </span>${perfil.nombre.toUpperCase()} ${perfil.apellido.toUpperCase()}</h2>
    <h3 id="borrarElemento1"><span class="ingresoMail">${perfil.username}</span></h3>
    `
    //ACTUALIZACION DE BODY Y CIERRE DE CUADRO DE EDICION
    newBody()
    cerrarEdicion()
    return false
}

async function editarImagen (e,imagen, id){
    let formData 
    console.log('e.target.value')
    console.log(e.target.value)
    if((imagen.value)){
        //ACTUALIZACION AUTOMATICA DE AVATAR EN HEADER 
        let form = document.querySelector("#form");
        formData = new FormData(form)            
        const blob = formData.get('imagen')
        const file = URL.createObjectURL(blob)
        document.querySelector("#divid").innerHTML=  `<img class="avatarFoto fotoGrande" src="${file} " alt="AVATAR">`
        //ACTUALIZACION DE AVATAR EN PERSISTENCIA 
        try {
            await fetch(`/api/usuarios/${id}`,{
                method: 'PUT',
                body: formData
            })
            alert('Imagen Modificada Exitosamente')
        } catch (error) {
            console.log('error en PUT DE PERFIL', error);
            throw (error)
        } 
    }
}