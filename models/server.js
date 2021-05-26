const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');


const { connectionMongoDB } = require('../db/mongo');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.connectionDB()

        this.middlewares()
        this.routes();
    }

   async connectionDB(){
        await connectionMongoDB()
    }

    middlewares(){
        this.app.use( express.static('public'));
        this.app.use(cors(process.env.CORS))
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
      }

    routes(){
       this.app.use('/api/briseo', require('../api/components/briseo/routes'))
    }

    start(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
         });
    }
}

module.exports= Server;
