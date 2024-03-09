const bodyJsonValido = (err, req, res, next) => {

    res.status(400).json({
        msg: "Body de la petición con formato no válido",
        err: err.message
    });
}


module.exports = {
    bodyJsonValido
}