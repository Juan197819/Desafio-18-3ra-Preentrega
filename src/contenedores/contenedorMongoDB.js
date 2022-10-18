import mongoose from 'mongoose'
import {HOST_MONGO, PORT_MONGO, NODE_ENV, MONGO_ATLAS} from '../config/configEntorno.js'
import {logueoError}from '../config/confWinston.js';

class ContenedorMongoDb{
    constructor(nombreColleccion, Schema){
        this.colleccion = mongoose.model(nombreColleccion, Schema)
    }

    static async iniciarPersistencia(){
        try {
            let url;
            if (NODE_ENV=='desarrollo') {
                url = `mongodb://${HOST_MONGO}:${PORT_MONGO}/ecommerce` 
                console.log('Mongo conectado local')
            }else{
                url = `${MONGO_ATLAS}` 
                console.log('Mongo ATLAS conectado')
            }
            await mongoose.connect(url)
            console.log('Base de datos MongoDB conectada')
        } catch (error) {
            logueoError('Error en la conexion de MongoDB: ', error)
        }
    }

    async leer(id){
        let parametroBusqueda = {}
        let tipoDeArgumento;
        // console.log('id leer');
        // console.log(id);
        if(id){
            if (id.length==24) {
                tipoDeArgumento = 'ID'
                parametroBusqueda = {'_id' :id}  
            }else{
                tipoDeArgumento = 'OBJETO'
                parametroBusqueda=id
            }
        }else{
            tipoDeArgumento = 'VACIO'
        }
        try {
            console.log(tipoDeArgumento)
            // console.log('parametroBusqueda')
            // console.log(parametroBusqueda)

            const datos= await this.colleccion.find(parametroBusqueda, {__v:0})
            return datos
        } catch (error) {
            logueoError(`Este es el error en MONGO-LEER con Argumento: ${tipoDeArgumento}`, error)
        }
    }
    async guardar(datos) {
        try {
            let datoAgregado = await this.colleccion.create(datos)
            return datoAgregado
        } catch (error) {
            logueoError(`Este es el error en MONGO-GUARDAR: `, error)
        }
    }
    async modificar(elementoAnterior, elementoModificado,tipoDeModificacion) {

        console.log('tipoDeModificacion' + tipoDeModificacion)
        switch (tipoDeModificacion) {
            case '$set':
                try {
                    return await this.colleccion.updateOne(elementoAnterior,{$set: elementoModificado})
                } catch (error) {
                    logueoError(`Este es el error en MONGO-MODIFICAR-TIPO SET: `, error)
                }
                case '$push':
                    try {
                    console.log("push")
                    return await this.colleccion.updateOne(elementoAnterior,{$push: elementoModificado})
                } catch (error) {
                    logueoError(`Este es el error en MONGO-MODIFICAR-TIPO PUSH: `, error)
                }
                default:
                    try {
                    console.log("default")
                    return await this.colleccion.update(elementoAnterior,elementoModificado)
                } catch (error) {
                    logueoError(`Este es el error en MONGO-MODIFICAR por DEFAULT: `, error)
                }
                break;
        }
        
    }

    async eliminar(id){
        try {
            let parametroBusqueda = {'_id' :id} 
            const datos= await this.colleccion.deleteOne(parametroBusqueda)
            return datos
        } catch (error) {
            logueoError(`Este es el error en MONGO-ELIMINAR: `, error)
        }
    }




}
export default ContenedorMongoDb