const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const dbconnect = require("./config/conexion");
const comidaRouter = require('./routes/comida_router');
const rutas = require('./routes/login');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Rutas
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my server" });
});

app.use('/api', comidaRouter); // Monta las rutas de comida bajo /api
app.use('/auth', rutas);       // Monta las rutas de autenticación bajo /auth

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Conexión a la base de datos
dbconnect();

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
