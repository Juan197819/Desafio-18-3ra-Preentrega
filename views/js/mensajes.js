let socket =io.connect()

const mostrarSaludo= ()=>{
  let despedida= `Hasta Luego `;

  document.getElementById('saludo').innerHTML=despedida
  document.getElementById('home').remove()
  document.getElementById('form')&&document.getElementById('form').remove()
  document.getElementById('divid').remove()
  return
}

const agregarMensaje= ()=>{
  let mensajeTexto = document.getElementById('mensaje')

    let mensaje= { 
      author:{  
        id : document.getElementById('email').value,
        nombre : document.getElementById('nombre').value,
        apellido : document.getElementById('apellido').value,
        edad : document.getElementById('edad').value,
        alias : document.getElementById('alias').value,
        avatar : document.getElementById('avatar').value,
      },
      text: mensajeTexto.value
    }
    socket.emit("mensajeNuevo", mensaje);
    
    mensajeTexto.value=""
    mensajeTexto.focus()
    return false
}

const renderMensajes= (mensajesNormalizados)=>{ 
  const autor = new normalizr.schema.Entity('autores')
  const mensaje = new normalizr.schema.Entity('mensajes',{
      author: autor
  })
  const grupoMensajes = new normalizr.schema.Entity('chats',{
      mensajes: [mensaje]
  })
  const desnormalizada= normalizr.denormalize(mensajesNormalizados.result,grupoMensajes,mensajesNormalizados.entities)
  
  let data,compresion
  if (!desnormalizada) {
    data= []
  } else {
    data= desnormalizada.mensajes
    let tamanioNormalizado = ((JSON.stringify(mensajesNormalizados)).length)
    let tamanioOriginal =((JSON.stringify(desnormalizada)).length)
    let porcentajeNormalizado=(tamanioNormalizado*100)/tamanioOriginal
    compresion =100- parseInt(porcentajeNormalizado)
    if (document.getElementById('compresion')) {
      document.getElementById('compresion').innerHTML= `Compresion: ${compresion}%`;
    }
  }
  const mensajeNuevo = data.map((dato) => { 
      return (`<p class="dialogo flexRow"><span class="estiloMail">${dato.author.id}</span> - <span class="estiloFecha">${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}</span> - <span class="estiloMensaje">${dato.text}</span><img class="avatar" src="${dato.author.avatar}" alt="avatar"></p>`);
    }).join("");
    if (document.getElementById('conversacion')) {
      document.getElementById('conversacion').innerHTML= mensajeNuevo;
    }
}
socket.on("mensajes", (data) => {
  renderMensajes(data);
});
