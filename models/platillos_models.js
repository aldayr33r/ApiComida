const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const platillosSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true, unique: true },
    precio: { type: Number, min: 0 },
    ingredientes: { type: String, required: true },

  });

  const Platillo = mongoose.model('Platillo', platillosSchema);
  module.exports = Platillo;