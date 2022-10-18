let headerPerfil =  document.querySelector("header");
let headerPerfilDiv =  document.querySelector("header .divTitulo");
let fotoPerfil =  document.querySelector("header .avatarFoto");
let perfil =  document.querySelector("#centroMensajes .perfil");
let main =  document.querySelector("#centroMensajes");
let lapiz =  document.querySelector("#centroMensajes .lapiz");

function calcularEdad(fecha) {
    let hoy = new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
};

(function(){
   //AGREGADO DE ESTILOS EN PERFIL 
   headerPerfil.classList.toggle('headerFijo')
   headerPerfilDiv.classList.toggle('bienvPerfil')
   fotoPerfil.classList.toggle('fotoGrande')
   main.classList.add('flexCol', 'mainPerfil')
   main.classList.remove('flexRow')

//FORMULARIO PARA MODIFCAR AVATAR DE PERFIL
   headerPerfil.innerHTML= `
       <form id='form' class='camaraDiv'>
           <input id='archivo' type ="file" name="imagen" required />
       </form>` + headerPerfil.innerHTML

})()
async function r(){
// GET PARA OBTENER DATOS PARA EDITAR PERFIL
    let response =  await fetch(`/api/usuarios`)
    response =  await response.json()
            
    let imagen = document.querySelector("#archivo");
    imagen.addEventListener('change', () =>editarImagen(imagen, response[0]._id))

//INSERCION DE DATOS OBTENIDOS POR FETCH PARA EDITAR 
    const datosPerfil = `
        <p class='flexRow flexContent'>
            <span>Nombre: </span>
            <span>${response[0].nombre}</span>
        </p>
        <p class='flexRow flexContent'>
            <span>Apellido: </span>
            <span>${response[0].apellido}</span>
        </p>
        <p class='flexRow flexContent'>
            <span>Edad: </span>
            <span>${calcularEdad(response[0].fechaNacimiento)}</span>
        </p>
        <p class='flexRow flexContent'>
            <span>Direccion: </span>
            <span>${response[0].direccion}</span>
        </p>
        <p class='flexRow flexContent'>
            <span>Telefono: </span>
            <span>${response[0].telefono}</span>
        </p>
        <p class='flexRow flexContent'>
            <span>Email: </span>
            <span>${response[0].username}</span>
        </p>
     `
    perfil.innerHTML=datosPerfil
    return 
}
r()

let divEditarPerfil,salir

//FUNCION DEL BOTON LAPIZ PARA VER CUADRO DE EDICION DE USUARIO
async function editarPerfil (){
    let response =  await fetch(`/api/usuarios`)
    response =  await response.json()
    console.log(response[0]._id);
    divEditarPerfil =  document.querySelector("#centroMensajes .editarPerfil");

    const insertarEdicion= `
    <div class="flexCol contentCenter">
    <p class='salir'> X </p>
    <div class="usuario H1Register  flexCol contentCenter">
        <h1 class="H1Register">Datos Personales</h1>
        <form id='formEdicion' class="flexCol">
            <label for="nombre">Nombre</label>
            <input id='nombre' type="text" required name="nombre" value="${response[0].nombre}"/>

            <label for="apellido">Apellido</label>
            <input id='apellido' type="text" required name="apellido" value="${response[0].apellido}"/>

            <label for="direccion">Direccion</label>
            <input id='direccion' type="text" required name="direccion" value="${response[0].direccion}"/>

            <div>
                <p>Fecha de Nacimiento</p>
                <div class="flexRow">
                <input pattern="[0-9]{2}" id='dia' type="text" required name="dia" placeholder="${response[0].fechaNacimiento.substring(8, 10)}" value="${response[0].fechaNacimiento.substring(8, 10)}"/>
                <input pattern="[0-9]{2}" id='mes' type="text" required name="mes" placeholder="${response[0].fechaNacimiento.substring(5, 7)}" value="${response[0].fechaNacimiento.substring(5, 7)}"/>
                <input pattern="[0-9]{4}" id='anio' type="text" required name="anio" placeholder="${response[0].fechaNacimiento.substring(0, 4)}" value="${response[0].fechaNacimiento.substring(0, 4)}"/>
                </div>
            </div>
            
            <label for="phone">Ingrese codigo de area y telefono</label>
            <input pattern="[+]{1}[0-9]{8,16}" oninput="return process(event)" id="phone" type="tel" name="phone" required value='${response[0].telefono}'/>

            <label for="username">Email</label>
            <input id="username" type="email" required name="username" value="${response[0].username}"/>

            <button id='botonGuardar'>Guardar</button>
        </form> 
    </div>
    `
    divEditarPerfil.innerHTML=insertarEdicion
    const formEdicion = document.querySelector("#formEdicion")
    formEdicion.addEventListener('submit', (e)=> {
        return guardarPerfil(e, response[0]._id)
    })

    prefijosTel()
    salir = document.querySelector("p.salir")
    salir.addEventListener('click', cerrarEdicion)

    //CAMBIO DE ESTILOS EN CUADRO DE EDICION DE PERFIL
    headerPerfil.classList.toggle('difuso') 
    headerPerfilDiv.classList.toggle('difuso') 
    fotoPerfil.classList.toggle('difuso') 
    perfil.classList.toggle('difuso')  
    main.classList.toggle('difuso') 
    lapiz.classList.toggle('difuso')
}
lapiz.addEventListener('click', editarPerfil)

//CERRAR CUADRO DE EDICION
function cerrarEdicion() {
    divEditarPerfil.innerHTML=''
    let claseDifuso =  document.querySelectorAll('.difuso');
    for (const clase of claseDifuso) {
        clase.classList.remove('difuso')
    }
    console.log(claseDifuso);
}

//FUNCIONES PARA VER LISTADO DE PREFIJOS TELEFONICOS 
let phoneInputField, phoneInput
function prefijosTel(){
    if ( document.querySelector("#phone")) {
        phoneInputField = document.querySelector("#phone");
        phoneInput = window.intlTelInput(phoneInputField, {
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        })
    }
}
function process(event) {
    event.preventDefault();
    const phoneNumber = phoneInput.getNumber();
    phoneInputField.value =phoneNumber;
}
