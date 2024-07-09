require('dotenv').config(); // Cargar variables de entorno

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.TU_CORREO_PERSONAL,
        pass: process.env.GMAIL_PASS
    }
});

module.exports = transporter;
