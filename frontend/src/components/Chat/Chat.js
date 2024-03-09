import {useEffect, useContext, useRef, useState } from 'react';
import { SocketContext } from '../../context/SocketContext';
import { AuthContext } from '../../auth/authContext';
import { Mensaje } from './Mensaje';
import './Chat.css';

export const Chat = ({sala}) => {
    
    const {user} = useContext(AuthContext);
    const [listaMensajes, setListaMensajes] = useState([]); // [{usuario: 'yolo', mensaje:'valgo',suMensaje:true}, {usuario: 'you', mensaje:'win',suMensaje:false}]

    //const [salas, setSalas] = useState([]);
    const { socket } = useContext( SocketContext );
    const chatArea = useRef();
    const contenedorChat = useRef();

    useEffect(() => {
        socket.on('recibir-mensaje', ({usuario, mensaje}) => {
            //console.log('mensaje recibido');
            setListaMensajes(listaMensajes => [...listaMensajes, {usuario, mensaje, suMensaje:true}]);
        });
    }, [socket]);

    const enviarMensaje = (event) => {
        event.preventDefault();
        const data = Array.from(new FormData(event.target));
        const { mensaje } = Object.fromEntries(data);

        event.target.mensaje.value = '';
        const usuario = user.nickName; 

        socket.emit('enviar-mensaje', { usuario, mensaje, sala });
        setListaMensajes(listaMensajes => [...listaMensajes, {usuario, mensaje,suMensaje:false}]);
    }

    //TODO: revisar
    useEffect(()=>{
        if(sala !== "") {
            socket.emit("entrar-sala", sala);
        }
        setListaMensajes([]);
    }, [sala]);
    
    useEffect(()=> {
        contenedorChat.current.scrollTop = contenedorChat.current.scrollHeight;
        /*
        var objDiv = document.getElementById("your_div");
        objDiv.scrollTop = objDiv.scrollHeight;
        */
    }, [listaMensajes]);
    
    return (
        <div className='container'>
            <div className='row'>                
                <div ref={contenedorChat} className="contenedor-chat col-12">
                    <div className='contenedor-mensajes col-12' ref={chatArea}>
                        {listaMensajes.map( (m,i) => <Mensaje key={i} usuario={m.usuario} mensaje={m.mensaje} fecha={m.fecha} suMensaje={m.suMensaje} /> )}     
                    </div>  
                </div>    
            </div>
            <form className='row mt-2' onSubmit={( event ) => enviarMensaje(event)}>                           
                    <div className='col-md-9 mt-md-1'><input name="mensaje" type='text' className='form-control' /></div>
                    <div className='col-md-3 mt-1'><button type='submit' className='btn btn-primary form-control' >Enviar</button></div>
            </form>
        </div>
    )
}