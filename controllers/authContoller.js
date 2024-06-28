const User = require('../models/usuario.models');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
        return res.status(400).send('Usuario o contraseña no proporcionados');
    }

    try {
        const user = await User.findOne({ usuario });
        if (!user) {
            return res.status(400).send('Usuario no encontrado');
        }

        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
            return res.status(400).json({auth: false, message: 'Contraseña incorecta' });
        }

        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        });

        res.json({auth: true, token})

    } catch (error) {
        next(error);
    }
};

const registro = async (req, res, next) => {
    const { usuario, email, password } = req.body;
    if (!usuario || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    const user = new User({
        usuario: usuario,
        email: email,
        password: password
    });

    try {
        user.password = await user.encryptPassword(user.password); 
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        });

        res.json({ auth: true, token });
    } catch (error) {
        if (error.code === 11000) { // Error de duplicado de email
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        next(error);
    }
};

const prueba =  (req, res, next) => { 
    return res.json({message: 'hola'})
}

module.exports = {
    login,
    registro,
    prueba
};
