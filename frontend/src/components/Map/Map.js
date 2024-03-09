import React, { useEffect, useState, useContext, useRef } from 'react'
import { SocketContext } from '../../context/SocketContext';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import './Map.css';

import markerPicture from './marker.png';
import markerPictureNew from './marker_new.png';
import L from 'leaflet';


function MyMapa({setCoordenadas}) {
    const map = useMap();
    const { socket } = useContext( SocketContext );

    

    useEffect(()=>{
        map.addEventListener("click",(e) =>{
            //const {lat, lng} = e.latlng;
            setCoordenadas(e.latlng);
        });
    },[]);

    return null
}

const markerImg = L.icon({
    iconUrl: markerPicture,
    iconSize:[35,35]
});

const markerImgNew = L.icon({
    iconUrl: markerPictureNew,
    iconSize:[35,35]
});


export const Map = ({setSala}) => {

    const nombreSala = useRef();
    const [salas, setSalas] = useState([]);
    const { socket } = useContext( SocketContext );
    const [coordenadas, setCoordenadas] = useState({});

    useEffect(()=>{
        socket.emit('get-lista-sala');
        socket.on('lista-salas', (data) => setSalas(data));            
    },[]);

    const entrarEnSala = (sala) => {
        setSala(sala.nombre);
        
        // TODO acceder a sala por Id, si el nombre está repe falla
        // TODO modificar en backend lo necesario
    }

    const crearSala = () => {
        //console.log(nombreSala.current.value);
        //console.log(coordenadas);
        if(nombreSala.current.value && coordenadas.lat) {
            socket.emit("crear-sala", {
                nombre: nombreSala.current.value,
                lat: coordenadas.lat,
                lng: coordenadas.lng
            });
            nombreSala.current.value = "";
            setCoordenadas({});
        }

    }

    return (
        <div className='container' >
            <h2 className='mt-2 mb-0'>Selecciona o crea sala</h2> 
            <hr className='mt-0' />
            <div className="row">            
                <div className="col-md-4">
                    <h3>Nueva Sala</h3>
                    <label>Nombre Sala:</label>
                    <input ref={nombreSala} type="text" className="form-control" name="nombreSala" placeholder='Nombre sala' />
                    <label>Coordenadas</label>
                    <input type="text" className="form-control" name="coordenadas" disabled='true' value={
                        (coordenadas.lat)
                        ?"(" + coordenadas.lat + ")(" + coordenadas.lng + ")"
                        :""
                        } placeholder="Haz click en el mapa, no cliques en tu casa 😉" />
                    <button className='btn btn-success mt-2 mb-2' onClick={crearSala}>Crear Sala</button>
                </div>  
                <div className="col-md-8" >
                    <MapContainer className="map-container" center={[41.40257722244276, 2.194627921730429]} zoom={17} scrollWheelZoom={false}>
                        <MyMapa setCoordenadas={setCoordenadas} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            salas.map(sala => 
                                <Marker position={[sala.lat, sala.lng]} icon={markerImg} >
                                    <Popup>
                                        <h4>{sala.nombre}</h4>
                                    <button class="btn btn-secondary" onClick={()=>entrarEnSala(sala)}>Acceder</button>
                                    </Popup>
                                </Marker>
                            )
                        }
                        {
                            (coordenadas.lat) ? <Marker position={[coordenadas.lat, coordenadas.lng]} icon={markerImgNew} />
                            :""
                        }                        
                        
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}
