let infoCard = document.getElementById('listaProductos')
let filtro = document.getElementById('filtro')
let productosLista=''

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
        </div>
      `)
    })
    infoCard.innerHTML = productos.join("")
    //LA VISTA DE PRODUCTOS ACHICA LA VISTA DEL CENTRO DE MENSAJES
    document.getElementById('msj').classList.remove('w800')
  } catch (error) {
    console.log('ERROR AGREGANDO PRODUCTOS')
    console.log(error)
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
//AGREGO PRODUCTO AL CARRITO
const agregarAlCarrito= async (id, email)=>{
  //COMPRUEBO SI HAY UN ID DE CARRITO GUARDADO EN STORAGE
  let idCarrito= localStorage[email]

  //SI NO HAY ID DE CARRITO HAGO UN POST PARA CREAR UN CARRITO NUEVO  
  if (!idCarrito) {
    idCarrito = await fetch("/api/carritos/",{
      method: 'POST'
    })
    idCarrito = await idCarrito.json()

    // ASOCIO ID DE CARRITO AL MAIL PARA GUARDAR EN 
    //STORAGE Y QUE EL CARRITO PERSISTA EN CADA INICIO DE SESION 
    localStorage[email]= idCarrito
    console.log('carrito nuevo creado')
  }
  const response = await fetch(`/api/carritos/${id}/productos`, {
    method: 'POST',
    body: JSON.stringify({idCarrito}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(await response.json())
}