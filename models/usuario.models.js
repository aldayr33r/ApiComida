const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    usuario: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false } 
});


userSchema.methods.encryptPassword = async function(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error al encriptar la contraseña');
    }
};


userSchema.methods.validatePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Error al comparar las contraseñas');
    }
};


const User = mongoose.model('User', userSchema);
module.exports = User;
