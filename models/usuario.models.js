const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt'); 

//  Modelo user
const userSchema = new Schema({
    usuario: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Metodo para encriptar la contraseña
userSchema.methods.encryptPassword = async function(password) {
    try {
        const salt = await bcrypt.genSalt(10); 
        return await bcrypt.hash(password, salt); 
    } catch (error) {
        throw new Error('Error al encriptar la contraseña');
    }
};

// Metodo para comparar contraseñas
userSchema.methods.validatePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password); 
    } catch (error) {
        throw new Error('Error al comparar las contraseñas');
    }
};

module.exports = model('User', userSchema);