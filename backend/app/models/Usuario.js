const { Schema, model } = require('mongoose');
const usuarioSchema = Schema({
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: [true, 'Email existente']
    },
    pass: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    nickName: {
        type: String,    
        required: [true, 'nickName obligatorio'],
        unique: [true, 'nickName no disponible']    
    },
    foto: {
        type: String
    },
    fechaCreacion: {
        type: Date,
        required: [true, 'fecha creación no disponible']
    },
    rol: {
        type:String,
        required: true,
        enum: ['ADMIN', 'USER']
    },   
    activo: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', usuarioSchema);