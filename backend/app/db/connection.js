const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_DB_CONNECTION } = process.env;

const dbConnection = async() => {
    try {
        //console.log('conectando con BD ' + MONGO_DB_CONNECTION );
        await mongoose.connect(MONGO_DB_CONNECTION);
        console.log('BD online!');
    } catch (err) {
        console.log( err );
        throw new Error('Error al iniciar BD');
    }
}

module.exports = dbConnection;
