import {schema, normalize} from 'normalizr'


const normalizado= (arrayMensajes)=>{
    let ids =1
    const newArray = arrayMensajes.map((mensaje)=>{
        mensaje.id=ids 
        ids++
        return mensaje
    })
    const chatConIds = {
        id: 'mjs',
        mensajes: newArray
    }
    const autor = new schema.Entity('autores')
    const mensaje = new schema.Entity('mensajes',{
        author: autor
    })
    const grupoMensajes = new schema.Entity('chats',{
        mensajes: [mensaje]
    })
    console.log('DATA NORMAL')
    console.log(JSON.stringify(chatConIds).length)
    
    const mensajesNormalizados= normalize (chatConIds,grupoMensajes)
    console.log('DATA normalizada')
    console.log(JSON.stringify(mensajesNormalizados).length)
 
    return mensajesNormalizados
  }
export default normalizado