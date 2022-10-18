async function guardarPerfil(e, id){
    e.preventDefault()
    let fechaNacimiento= `${document.getElementById('anio').value},${document.getElementById('mes').value},${document.getElementById('dia').value}`
    console.log(fechaNacimiento);
    let perfil= { 
        nombre : document.getElementById('nombre').value,
        apellido : document.getElementById('apellido').value,
        fechaNacimiento,
        direccion : document.getElementById('direccion').value,
        telefono : document.getElementById('phone').value,
        username : document.getElementById('username').value,
    }
    console.log(perfil);
    try {
        await fetch(`/api/usuarios/${id}`,{
            method: 'PUT',
            body: JSON.stringify(perfil),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        alert('MODIFICACION EXITOSA')
        console.log('MODIFICACION DE USUARIO OK');
    } catch (error) {
        throw new Error(error)
    }

    document.querySelector('header div.divTitulo').innerHTML=`
    <h2 class="ingreso puto"><span class="ingreso" id="saludo">Bienvenido/a </span>${perfil.nombre.toUpperCase()} ${perfil.apellido.toUpperCase()}</h2>
    <h3 id="borrarElemento1"><span class="ingresoMail">${perfil.username}</span></h3>
    `
    r()
    cerrarEdicion()
    return false
}

async function editarImagen (imagen, id){
    let formData 
    if((imagen.value)){
        let form = document.querySelector("#form");
        formData = new FormData(form)            
        const blob = formData.get('imagen')
        const file = URL.createObjectURL(blob)
        document.querySelector("#divid").innerHTML=  `<img class="avatarFoto fotoGrande" src="${file} " alt="AVATAR">`
    }
    try {
        const response = await fetch(`/api/usuarios/${id}`,{
            method: 'PUT',
            body: formData
        })
        const resParse= await response.json()
        alert(resParse)
        console.log(response);
    } catch (error) {
        console.log('error en PUT DE PERFIL');
        console.log(error);
        console.log('error en PUT DE PERFIL');
        throw new Error(error)
    } 
}