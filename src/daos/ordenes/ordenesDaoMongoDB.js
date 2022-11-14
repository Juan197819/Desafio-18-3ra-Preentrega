import ContenedorMongoDb from '../../contenedores/contenedorMongoDB.js'
import mongoose from 'mongoose'

const schemaOrdenes= new mongoose.Schema({
    nombreComprador: {type: String, required: true},
    emailComprador: {type: String, required: true},
    numOrden: {type: Number, required: true},
    productos: {type: Array, required: true},
    fyh: {type: String, required: true},
    estado:{type: String, required: true},
  }

)
class DaoOrdenesMongo extends ContenedorMongoDb{
    constructor(){
        super('Ordenes', schemaOrdenes)
    }
}

export default DaoOrdenesMongo
