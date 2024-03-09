import './Mensaje.css';
export const Mensaje =({ usuario, mensaje, suMensaje, fecha}) => {
    //console.log(suMensaje);
    const classMiMensaje = "mi-bocadillo mb-2 offset-md-2 col-md-10 p-2"
    const classSuMensaje = "bocadillo mb-2 col-md-10 p-2"

    //console.log(fecha);

    return (
        <div className={suMensaje?classSuMensaje:classMiMensaje}><strong>{usuario}</strong><br />
        {mensaje}
        
        </div>
    )
}