let infoCard = document.getElementById('listaProductos')
let filtro = document.getElementById('filtro')
let productosLista=''

const productosBD = async ()=>{
  productosLista = await fetch(`/api/productos`)
  productosLista = await (productosLista.json())
}

async function agregarProductos (mail){
  await productosBD()
  armarListado(mail)
}

async function armarListado (mail){
  try {
    let productos = productosLista.map((product)=>{
      return( `
      <div class="cardProduct">
        <p class="nombreProducto">${product.nombre}</p>
        <img class='fotoProductos' src=${product.foto} alt=${product.nombre}></img>
        <p class="precio">Precio: $${product.precio}</p>
        <p class="envio">Envio Gratis</p>
        <p class="stock">Stock: ${product.stock}</p>
        <button onclick='return agregarAlCarrito("${product._id}","${mail}")' >Agregar al carrito</button>
      </div>`)
    })
    filtro.innerHTML = `
      <div class="flexRow buscador">
        <input class="filtro" type="text" id="fil" name="filtro" value="">
        <button onclick='return listaProductosFiltrados(this)' class="botonLupa">
          <div class="lupa"></div>
        </button>
      </div>
    `
    infoCard.innerHTML = productos.join("")
    document.getElementById('msj').classList.remove('w800')
  } catch (error) {
    console.log('ERROR AGREGANDO PRODUCTOS')
    console.log(error)
  }
}

async function listaProductosFiltrados (e){
  await productosBD()
  let p = document.getElementById('fil').value
  let listaFiltrada= productosLista.filter(product=>{
    if(product.nombre.toUpperCase().includes(p.toUpperCase())){
      return product
    }
  })
  productosLista=listaFiltrada
  armarListado()
}

function sacarProductos (e){
  infoCard.innerHTML = ("")
  filtro.innerHTML = ("")
  document.getElementById('msj').classList.toggle('w800')
}
const agregarAlCarrito= async (id, email)=>{

  let idCarrito= localStorage[email]
  console.log('idCarrito')
  console.log(idCarrito)
  console.log(email)
  console.log('idCarrito')
  if (!idCarrito) {

    idCarrito = await fetch("/api/carritos/",{
      method: 'POST'
    })
    idCarrito = await idCarrito.json()
    // let user ={}
    // user[email]=idCarrito
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

//BOTONES AGREGAR Y RESTAR UNIDADES

