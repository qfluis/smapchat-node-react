const jwt = require('jsonwebtoken');
const { response, request } = require('express');

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('jwt-token');

    if( !token ){
        res.status(401).json({
            msg: "Acceso denegado, no facilitado token"
        });
        return;
    }

    try {
        
        const payload = jwt.verify(token, process.env.JWT_SECRET_PRIVATE_KEY);
        //console.log(payload.email, 'ha hecho una petición');
        next();  

    } catch (error) {
        //console.log(error);
        res.status(401).json({
            msg: 'token no válido'
        });
        return;
    }

    
}

module.exports = {
    validarJWT
}