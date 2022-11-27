let carrito=[]
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
const vaciarCarrito = async (email,idCarrito, compraOk)=>{
    localStorage.removeItem(email)
    idCarrito = await fetch(`/api/carritos/${idCarrito}`,{
        method: 'DELETE'
    })     
    if(compraOk) alert('COMPRASTE EL CARRITO, FELICITACIONES!!!')
    irAlCarrito()
}

const comprarCarrito = async (email,nombreCompleto, telefono)=>{
  let idCarrito= localStorage[email] 
  const response = await fetch(`/api/ordenes/${email}`,{
    method: 'POST',
    body: JSON.stringify({carrito:carrito,nombreCompleto,telefono}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  vaciarCarrito(email, idCarrito, true)
}

const irAlCarrito= async (email, nombreCompleto, telefono)=>{
  let tabla
  let idCarrito= localStorage[email] 
  if(idCarrito){
    carrito = await fetch(`/api/carritos/${idCarrito}/productos`)
    carrito = await (carrito.json())
  }
  if (!carrito.length||!idCarrito) {
      let main= document.getElementById('home')
      main.classList.remove('flexRow','flexContent')
      main.classList.add('flexCol','contentCenter')
      tabla=`
      <div class='flexCol contentCenter'>
          <h1 class='carroVacio'>No hay productos en el carrito</h1>
          <a class="boton" href="/home">Volver a Centro de Mensajes</a>
      </div>
      `
  } else {
      let valorCarrito= 0
      carrito.sort()
      let filasProductos = carrito.map((product)=>{
          valorCarrito = valorCarrito + (Number(product.precio.toFixed(2))*Number(product.cantidad))
          return (`
          <tr class='trCart' key= '${product._id}'>
              <td>
              <img class='fotoProductos' src='${product.foto}' alt='${product.nombre}'></img>
              </td>
              <td>${product.nombre}</td>
              <td>${product.precio.toFixed(2)}</td>
              <td class='botonCart'>
              <div class='flexRow contentCenter'>
                  <button onclick='return restar("${product._id}",${product.precio},"${email}","${nombreCompleto}","${telefono}")'>-</button>
                  <p style='margin: 0 5px;' id='${product._id}'>${product.cantidad}</p> 
                  <button  onclick='return sumar("${product._id}",${product.precio},"${email}","${nombreCompleto}","${telefono}")'>+</button>
              </div>
              </td>
              <td id='tr${product._id}'>${(product.cantidad*product.precio).toFixed(2)}</td>
              <td>
              <button value=${product._id} class='cesto boton' onclick='return removeItem("${product._id}","${email}","removerItem","${nombreCompleto}","${telefono}")'>
                  <img class='cesto' src= '../img/icons/cesto.png' alt='Eliminar'/>
                  <span class='displayNone'>Eliminar</span>
              </button>
              </td>
          </tr>
          `)
      })
      tabla=`
      <div class="flexCol contentCenter carritoCelda">
        <table class='carritoCelda'>
          <thead>
              <tr>
                  <th>Producto</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th colSpan="2">Subtotal</th>
              </tr>
          </thead>
          <tbody>
            ${filasProductos.join('')}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="6">
                <span className='total' id='valorCarritoTotal'>Total valor del carrito ${valorCarrito.toFixed(2)}</span>
              </th>
            </tr>
          </tfoot>
        </table>
        <a class="boton" href="/home">Ir a Centro de Mensajes</a>
        <a class="boton" onclick='return vaciarCarrito("${email}","${idCarrito}")'>Vaciar Carrito</a>
        <a class="boton" onclick='return comprarCarrito("${email}","${nombreCompleto}", "${telefono}")'>Comprar Carrito</a>
      </div>
    `
  } 
  document.getElementById('home').innerHTML=tabla

}
const restar = async (id, precio, email, nombreCompleto,telefono) => {
  await removeItem(id, email,'restarUnidad', nombreCompleto,telefono)
  let p = document.getElementById(id)
  let pParseado = Number(p.innerHTML)

  if (!(pParseado<=1)) {
    p.innerHTML= (Number(p.innerHTML)) - 1

    let trSubtotal = document.getElementById(`tr${id}`)
    trSubtotal.innerHTML= ((Number(precio)) *  p.innerHTML).toFixed(2)
    carroTotal()
  }
}
const sumar = async (id, precio, email, nombreCompleto,telefono) => {
  await agregarAlCarrito(id, email)
  irAlCarrito(email,nombreCompleto,telefono)
  let p = document.getElementById(id)
  p.innerHTML= (Number(p.innerHTML)) + 1
  let trSubtotal = document.getElementById(`tr${id}`)
  trSubtotal.innerHTML= ((Number(precio)) *  p.innerHTML).toFixed(2)
  carroTotal()
}
const carroTotal = () =>{
  let valorCarrito= 0
  let spanCarrito = document.getElementById('valorCarritoTotal')
  carrito.forEach(p => {
    let trSubtotal = document.getElementById(`tr${p._id}`).innerHTML
    valorCarrito = valorCarrito + Number(trSubtotal)
  })
  spanCarrito.innerHTML= `Total valor del carrito ${valorCarrito.toFixed(2)}`
}
//----------------------------------------------------------------------------
const removeItem= async (id, email, eliminar,nombreCompleto,telefono)=>{
  let idCarrito= localStorage[email]
  await fetch(`/api/carritos/${idCarrito}/productos/${id}/${eliminar}`,{
    method: 'DELETE'
  })
  irAlCarrito(email,nombreCompleto,telefono)
}
