import { useContext, useState } from "react";
import { SocketContext } from '../context/SocketContext';
//import { Salas } from '../components/Salas';
import { Chat } from '../components/Chat/Chat';
import { Map } from '../components/Map/Map';

function HomePage() {

  const { online } = useContext( SocketContext )

  const [ sala, setSala ] = useState('');

  const salirSala = () => {
    setSala('');
  }
  
  return (
    <>
    <p className="service-status">
          Service status:&nbsp;
          {
            (online)
            ?<span className="text-success">Online</span>
            :<span className="text-danger">Offline</span>
          }
    </p>
    {
      (sala === '') 
      ? <Map setSala={setSala} />
      :<div className="container" >
        <div className="row">
          {/*
          <div className="col-md-3">
            <h2></h2>
            <Salas setSala={setSala} />
          </div>
          <div className="col-md-9">
            <h2>Chat {sala}</h2>
            <Chat sala={sala}/>
          </div>
          */}
          <h2>Chat {sala} <button className="btn btn-danger" onClick={salirSala}>Salir</button></h2>
          
          <hr className="mt-0" />
          <Chat sala={sala}/>
        </div>
      </div>
    }
    
    
    </>
  );
}

export default HomePage;
