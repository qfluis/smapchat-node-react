const express = require('express');
const http     = require('http');
const cors = require('cors');
const { bodyJsonValido } = require('../middlewares/body_json_valido');
const dbConnection = require('../db/connection');
//const { socketController } = require('../sockets/controller');
const Sockets = require('./sockets');

class Server {

    constructor() {
        this.app  = express();

        this.port = process.env.PORT;
        this.dbMongoConnection = process.env.MONGO_DB_CONNECTION;

        // HTTP Server
        this.server = http.createServer(this.app);

        // Sockets
        this.io = require('socket.io')(this.server, {
            cors: {
              origin: "http://localhost:3000",  //ws://?
              methods: ["GET", "POST"]
            }
        });

        // Database
        this.conectarDB();


        this.paths = {
            auth: "/auth"
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        // Devuelve error si al parsear json da error
        this.app.use(bodyJsonValido);
        // Directorio Público
        // this.app.use( express.static('public') );

    }

    routes() {        
        this.app.use( this.paths.auth, require('../routes/auth'));        
    }

    sockets() {
        //this.io.on('connection', socketController);
        new Sockets ( this.io );        
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;
