let carrito=[]

const vaciarCarrito = async (email,idCarrito)=>{
    console.log(email)
    localStorage.removeItem(email)
    idCarrito = await fetch(`/api/carritos/${idCarrito}`,{
        method: 'DELETE'
    })
    irAlCarrito()
}

const irAlCarrito= async (email)=>{
  console.log('EN CARRITO JS')
  let tabla
  let idCarrito= localStorage[email]
  console.log(idCarrito)
  if(idCarrito){
    carrito = await fetch(`/api/carritos/${idCarrito}/productos`)
    carrito = await (carrito.json())
  }
  console.log(carrito.length)
  console.log(carrito)
  if (!carrito.length||!idCarrito) {
      let main= document.getElementById('centroMensajes')
      main.classList.remove('flexRow','flexContent')
      main.classList.add('flexCol','contentCenter')
      tabla=`
      <div class='flexCol contentCenter'>
          <h1 class='carroVacio'>No hay productos en el carrito</h1>
          <a class="boton" href="/centroMensajes">Volver a Centro de Mensajes</a>
      </div>
      `
  } else {
      let valorCarrito= 0
      let filasProductos = carrito.map((product)=>{
          product.cantidad=1
          valorCarrito = valorCarrito + Number(product.precio.toFixed(2))
          return (`
          <tr class='trCart' key= '${product._id}'>
              <td>
              <img class='fotoProductos' src='${product.foto}' alt='${product.nombre}'></img>
              </td>
              <td>${product.nombre}</td>
              <td>${product.precio.toFixed(2)}</td>
              <td class='botonCart'>
              <div class='flexRow contentCenter'>
                  <button onclick='return quitar("${product._id}",${product.precio})'>-</button>
                  <p style='margin: 0 5px;' id='${product._id}'>${product.cantidad}</p> 
                  <button  onclick='return sumar("${product._id}",${product.precio})'>+</button>
              </div>
              </td>
              <td id='tr${product._id}'>${(product.cantidad*product.precio).toFixed(2)}</td>
              <td>
              <button value=${product._id} class='cesto boton' onclick='return removeItem("${product._id}","${email}")'>
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
        <a class="boton" href="/centroMensajes">Ir a Centro de Mensajes</a>
        <a class="boton" onclick='return vaciarCarrito("${email}","${idCarrito}")'>Vaciar Carrito</a>
      </div>
    `
  } 
  document.getElementById('centroMensajes').innerHTML=tabla
}
const quitar = (id, precio) => {
  let p = document.getElementById(id)
  let pParseado = Number(p.innerHTML)

  if (!(pParseado<=1)) {
    p.innerHTML= (Number(p.innerHTML)) - 1
    let trSubtotal = document.getElementById(`tr${id}`)
    trSubtotal.innerHTML= ((Number(precio)) *  p.innerHTML).toFixed(2)
    carroTotal(p.innerHTML)
  }
}
const sumar = (id, precio) => {
  let p = document.getElementById(id)
  p.innerHTML= (Number(p.innerHTML)) + 1
  let trSubtotal = document.getElementById(`tr${id}`)
  trSubtotal.innerHTML= ((Number(precio)) *  p.innerHTML).toFixed(2)
  carroTotal(p.innerHTML)
}
const carroTotal = (cant) =>{
  console.log(cant)
  let valorCarrito= 0
  let spanCarrito = document.getElementById('valorCarritoTotal')
  let total = carrito.forEach(p => {
    let trSubtotal = document.getElementById(`tr${p._id}`).innerHTML
    console.log(trSubtotal)
    valorCarrito = valorCarrito + Number(trSubtotal)
    
    console.log(valorCarrito)
  })
  console.log('total')
  console.log(valorCarrito)
  console.log('total')
  spanCarrito.innerHTML= `Total valor del carrito ${valorCarrito.toFixed(2)}`
  console.log(spanCarrito.innerHTML)
}
//----------------------------------------------------------------------------
const removeItem = async (id, email)=>{
  let idCarrito= localStorage[email]
  let response = await fetch(`/api/carritos/${idCarrito}/productos/${id}`,{
    method: 'DELETE'
  })
  irAlCarrito(email)

}
