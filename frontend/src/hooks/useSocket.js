import { useMemo, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
//import { AuthContext } from '../auth/authContext';


export const useSocket = ( serverPath, token ) => {
  // useMemo evita que cada vez que se recarga el socket vuelva a conectarse
  
  //const {user} = useContext(AuthContext);

  const socket = useMemo ( () => io.connect( serverPath,{
    transports: ['websocket'],
    query: {token}
  }), [ serverPath, token ]);  

  //const socket = useMemo( () => io.connect( serverPath ), [ serverPath ] );
  
  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);
  // TODO: securizar socket con JWT https://desarrolloactivo.com/blog/jwt-socket-io/ 
  useEffect(() => {
    socket.on('connect', ()=> {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', ()=> {
      setOnline(false);
    });
  }, [socket]);



  return {
      socket,
      online
  }

}