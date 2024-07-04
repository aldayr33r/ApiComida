const mongoose = require('mongoose');
require('dotenv').config(); // Para cargar variables de entorno desde un archivo .env

// Nombre Base De datos: ApiComida
const dbconnect = async () => {
    try {
        mongoose.set('strictQuery', true);
        const uri = `mongodb+srv://joan:${process.env.MONGODB_PASSWORD}@cluster0.tppmkru.mongodb.net/ApiComida?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(uri, {});
        console.log("Conexión correcta");
    } catch (error) {
        console.error("Error en la conexión", error);
    }
}

module.exports = dbconnect;
