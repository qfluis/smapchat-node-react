const Salas = require('./salas');
const jwt = require('jsonwebtoken');
require("dotenv").config();



// AUTENTICACIÓN CON JWT - https://desarrolloactivo.com/blog/jwt-socket-io/

class Sockets {
    constructor( io ) {

        this.salas = new Salas();
        // TODO: Listado usuarios x sala ¿?
        // TODO: Actualizar lista usuarios

        this.io = io;
        this.socketSecure();
        this.socketEvents();
    }

    socketSecure() {  
        
        this.io.use((socket, next) => {
            if (socket.handshake.query && socket.handshake.query.token){
                jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET_PRIVATE_KEY , function(err, decoded) {
                if(err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
                });
            } else {
                next(new Error('Authentication error'));
            }   
        });
    }

    socketEvents() {
        // On connection
        // TODO: revisar https://socket.io/docs/v4/server-socket-instance/
        this.io.on('connection', ( socket ) => {
            //socket.nickname = nickname;

            socket.on('disconnect', () => {
                //console.log("Cliente desconectado", socket.id);
                //TODO:desconectar de la sala¿?
            });
           
            socket.on("entrar-sala", (/*salaAnterior, */sala) => {
                // https://socket.io/docs/v3/rooms/
                const salaAnterior = Array.from(socket.rooms)[2];

                if (salaAnterior) socket.leave(salaAnterior);
                socket.join(sala);
                //console.log(socket.id, "Entra en sala " + sala);
                
                // emit("entrar-sala ¿?")
                // emit("salir-sala ¿?")
            });

            socket.on('enviar-mensaje', ({sala, usuario, mensaje}) => {
                socket.to(sala).emit('recibir-mensaje', {usuario, mensaje});
            });   
            
            socket.on('get-lista-sala', () => {
                socket.emit('lista-salas', this.salas.getSalas());
            });

            socket.on('crear-sala', (nuevaSala)=> {    
                this.salas.addSala(nuevaSala);
                this.io.emit('lista-salas', this.salas.getSalas());                
            });


        });
    }


}

module.exports = Sockets;