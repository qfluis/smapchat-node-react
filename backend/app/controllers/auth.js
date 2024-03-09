const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/Usuario');

const login = async (req = request, res = response) => {

    const { email, pass } = req.body;

    // Validar pass
    const usuario = await Usuario.findOne({email});
    if (!usuario || !bcrypt.compareSync(pass, usuario.pass) ) {
        return res.status(401).json({
            msg:"usuario y/o contraseña no válidos"
        }); 
    } 
       
    // Generar JWT
    //const token = await generarJWT( {email, rol:usuario.rol} );
    const token = await generarJWT( {email} );

    return res.status(200).json({
        msg: "login correcto 👍",
        token,
        email,
        nickName: usuario.nickName
    });    
}

const register = async (req = request, res= response) => {
    const { email, pass, nickName } = req.body;
    
    // Comprobaciones valores únicos BD
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        return res.status(400).json({
            msg:"Email existente en BD"
        });
    }
    const existeNickName = await Usuario.findOne({nickName});
    if (existeNickName) {
        return res.status(400).json({
            msg:"Nickname existente en BD"
        });
    }

    // Encriptar pass
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);

    // Usuario creados, por defecto son rol USER
    let usuario;
    try {
        usuario = new Usuario({ email, pass:hash, nickName, rol:'USER', fechaCreacion:new Date() });
        await usuario.save();
    } catch (err) {
        return res.status(500).json({
            msg:"Error en BD"
        });
    }    
    // Generar JWT
    //const token = await generarJWT( {email, rol:usuario.rol} );
    const token = await generarJWT( {email} );
    /*return res.status(201).json({
        msg:"usuario creado correctamente"
    });*/
    return res.status(201).json({
        msg: "login correcto 👍",
        token,
        email,
        nickName: usuario.nickName
    });  
}

const renewToken = async (req,res) => {
    const { email } = req.body;
    const token = await generarJWT( {email} );

    res.status(200).json({
        msg: "Token renovado 👍",
        token
    });  

}

const authNotFound = (req, res) => {
    res.status(400).json({
        msg: req.path + " - Endpoint no válido"
    });
}

module.exports = { login, register, renewToken, authNotFound }