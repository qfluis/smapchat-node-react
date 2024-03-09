const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { login, register,renewToken, authNotFound } = require('../controllers/auth');

const router = Router();
// login
router.post('/login', [    
    check('email', 'Debes especificar un email válido').isEmail(),
    check('pass', 'Debes introducir un password de al menos 6 caracteres').isLength({min:6}),
    validarCampos
], login);

// register
router.post('/register', [  // TODO: PETA ANTES DE HACER LOS CHECKS SI LE PASAS UN JSON NO VÁLIDO (MIRAR POSTMAN)
    check('email', 'Debes especificar un email válido').isEmail(),
    check('pass', 'Debes introducir un password de al menos 6 caracteres').isLength({min:6}),
    check('nickName', 'Debes introducir un nickName de al menos 3 caracteres').isLength({min:3}),   
    validarCampos
], register);

// Validar & revalidar token
router.post('/renew', validarJWT, renewToken);

// Not found
router.use(authNotFound);



module.exports = router;