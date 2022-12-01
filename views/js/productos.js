let infoCard = document.getElementById('listaProductos')
let filtro = document.getElementById('filtro')
let cuadroProducto = document.getElementById('botonActualizarProducto')
let centroMensajes = document.querySelector('div.centro')
let enlaces = document.querySelector('.enlaces')
let imagenCrearProducto = document.querySelector('#fotoProducto')
let formProductos = document.querySelector("#formProductos");

let productosLista=''
let cerrar, urlProducto, formData

imagenCrearProducto?.addEventListener('change', () =>cargaImagen())
formProductos?.addEventListener('submit', (e) =>crearProducto(e))

//PRIMER RENDER DE PRODUCTOS
if(infoCard){
  let mailUsuario = document.querySelector('h3 span.ingresoMail').textContent  
  agregarProductos(mailUsuario)
}
//FUNCION DE BOTON "LISTA DE PRODUCTOS" DE HOME
async function agregarProductos (mail){
  await productosBD()
  armarListado(mail)
}
//LLAMADA  GET PARA OBTENER LOS PRODUCTOS TOTALES O SEGUN FILTRO DE BUSCADOR
async function productosBD (){
  productosLista = await fetch(`/api/productos`)
  productosLista = await (productosLista.json())
}
// ARMADO DE VISTA DE PRODUCTOS
async function armarListado (mail){
  try {
    console.log(productosLista);
    //INSERCION DE BUSCADOR DE PRODUCTOS
    filtro.innerHTML = `
      <div class="flexRow buscador">
        <input class="filtro" type="text" id="fil" name="filtro" value="">
        <button onclick='return listaProductosFiltrados("${mail}")' class="botonLupa">
          <div class="lupa"></div>
        </button>
      </div>
    `
    //INSERCION DE CARDS DE PRODUCTOS
    let productos = productosLista.map((product)=>{
      return( `
        <div class="cardProduct">
          <p class="nombreProducto">${product.nombre}</p>
          <img class='fotoProductos' src=${product.foto} alt=${product.nombre}></img>
          <p class="precio">Precio: $${product.precio}</p>
          <p class="envio">Envio Gratis</p>
          <p class="stock">Stock: ${product.stock}</p>
          <button onclick='return agregarAlCarrito("${product._id}","${mail}")' >Agregar al carrito</button>
          <button onclick='return cuadroEdicionProducto("${product._id}","${mail}")' >Actualizar</button>
          <button onclick='return eliminarProducto("${product._id}","${mail}")' >Eliminar</button>
        </div>
      `)
    })
    infoCard.innerHTML = productos.join("")
    //LA VISTA DE PRODUCTOS ACHICA LA VISTA DEL CENTRO DE MENSAJES
    document.getElementById('msj').classList.remove('w800')
  } catch (error) {
    console.log('ERROR AGREGANDO PRODUCTOS')
    throw (new Error (error))
  }
}
// ARMADO DE VISTA DE PRODUCTOS SEGUN FILTRO 
async function listaProductosFiltrados (mail){
  await productosBD()
  let buscador = document.getElementById('fil').value
  let listaFiltrada= productosLista.filter(product=>{
    if(product.nombre.toUpperCase().includes(buscador.toUpperCase())){
      return product
    }
  })
  productosLista=listaFiltrada
  armarListado(mail)
}
//FUNCION PARA OCULTAR PRODUCTOS Y EXPANDIR CUADRO DE MENSAJES
function ocultarProductos (e){
  infoCard.innerHTML = ("")
  filtro.innerHTML = ("")
  document.getElementById('msj').classList.add('w800')
}
function cerrarActualizacionProductos () {
  cuadroProducto.innerHTML = ``
  infoCard.classList.remove('fondoOpaco')
  filtro.classList.remove('fondoOpaco')
  enlaces.classList.remove('fondoOpaco')
  centroMensajes.classList.remove('fondoOpaco')
}
function cargaImagen(fotoProducto=imagenCrearProducto, nombreProducto='Producto Nuevo') {
  console.log('EN CARGA IMAGEN');
  let formProd = document.querySelector("#formProductos");
  let formData = new FormData(formProd)            
  if((fotoProducto.value)){
    console.log('FOTO VALUE');
    const blob = formData.get('foto')
    const file = URL.createObjectURL(blob)
    document.querySelector("#divProd").innerHTML=  `
    <label for="foto">Imagen de Producto</label>
    <img class="imagenNuevaProducto" src="${file}" alt='Foto de ${nombreProducto}'>`
  }
}
async function cuadroEdicionProducto (idProducto, mail){
  let response =  await fetch(`/api/productos/${idProducto}`)
  let [producto] =  await response.json()

  cuadroProducto.innerHTML =`
  <div class="absolute flexCol w100 contentBetween usuario">
    <div class=" flexRow contentCenter w100">
      <h1 class="">Actualizacion de Producto</h1>
      <p class='cerrarCuadro'> X </p>
    </div>
    <form id='formProductos' style='width:100%;' class='flexCol contentAround alignStart'>
      <div class=" flexRow contentCenter w100">
        <label for="nombre">Nombre de Producto</label>
        <input type="text" required name="nombre" value="${producto.nombre}"/>
      </div>
      <div class=" flexRow contentCenter w100">
        <label for="descripcion">Descripcion</label>
        <textarea type="text" cols='30' rows='10' required name="descripcion">${producto.descripcion}</textarea>
      </div>
      <div class=" flexRow contentCenter w100">
        <label for="codigo">Codigo de Producto</label>
        <input type="text" required name="codigo" value="${producto.codigo}"/>
      </div>
      <div class="flexRow contentCenter w100">
        <label for="precio">Precio</label>
        <input type="number" required name="precio" value="${producto.precio}"/>
      </div>
      <div class="flexRow contentCenter w100">
        <label for="stock">Stock</label>
        <input type="number" required name="stock" value="${producto.stock}"/>
      </div>
      <div id='divProd' class="flexRow flexContent w100">
        <label for="foto">Imagen de Producto</label>
        <img class='imagenNuevaProducto' alt='Foto de ${producto.nombre}' src='${producto.foto}'>
      </div>
      <input id='fotoProducto' type="file" name="foto"/>
      <button style='margin: 10px auto;'>Actualizar</button>
    </form>
  </div>   
  `
  infoCard.classList.add('fondoOpaco')
  filtro.classList.add('fondoOpaco')
  enlaces.classList.add('fondoOpaco')
  centroMensajes.classList.add('fondoOpaco')
  
  let formProductos = document.querySelector("#formProductos");
  formProductos.addEventListener('submit', (e) =>actualizarProducto(e,idProducto,formProductos,producto.foto))
  
  urlProducto= document.querySelector('#fotoProducto')
  urlProducto.addEventListener('change', () =>cargaImagen(urlProducto, producto.nombre))
  
  cerrar= document.querySelector('.cerrarCuadro')
  cerrar.addEventListener('click',cerrarActualizacionProductos)
}
async function actualizarProducto (e, idProducto, formProductos, mail){
  let formData = new FormData(formProductos)            
  try {
    e.preventDefault()
    console.log(idProducto);
    console.log(formData);
    await fetch(`/api/productos/${idProducto}`,{
         method: 'PUT',
         body: formData,
     })
 } catch (error) {
     throw (error)
 }
cerrarActualizacionProductos()
await agregarProductos(mail)
}

async function crearProducto (e, idProducto, mail){
  let formProductos = document.querySelector("#formProductos");
  let formData = new FormData(formProductos)            

  const resp=await fetch(`/api/productos/`,{
    method: 'POST',
    body: formData
  })
  const respParse =await resp.json()
  console.log(respParse);
  alert(JSON.stringify(`PRODUCTO NUEVO CREADO, ID N°: ${respParse}`))

}
async function eliminarProducto (idProducto, mail){
  const resp=await fetch(`/api/productos/${idProducto}`,{
    method: 'DELETE'
  })
  const respParse =await resp.json()
  console.log(respParse);
  alert(JSON.stringify(respParse))
  await agregarProductos(mail)
}
