const mongoose = require('mongoose');

const connectionMongoDB = async () => {
    try{
       await mongoose.connect(process.env.MONGO_CONEXION_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex: true,
        useFindAndModify: false,
       })

       console.log('Conectado a MongoDB')

    }
    
    catch (error){
        console.log(error)
        throw new Error ('Error al conectar con base de datos')
    }
   
}

module.exports = {
    connectionMongoDB
  }
  
