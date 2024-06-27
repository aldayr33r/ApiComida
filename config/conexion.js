const mongoose = require('mongoose');
//Nombre Base De datos: ApiComida
const dbconnect = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect('mongodb://127.0.0.1:27017/ApiComida', {});
        console.log("Conexión correcta");
    } catch (error) {
        console.error("Error en la conexión", error);
    }
}

module.exports = dbconnect;
