const jwt = require('jsonwebtoken');

const generarJWT = async ( payload ) =>{
    //const payload = { email };
    // Tiempo de expiración largo para facilitar el desarrollo
    // Una vez en producción es recomendable un tiempo más corto.
    return jwt.sign( payload, process.env.JWT_SECRET_PRIVATE_KEY, {
        expiresIn:"365d"
    });       
}


module.exports = {
    generarJWT
}