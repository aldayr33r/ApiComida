const { Router } = require('express');
const router = Router();
const authController = require('../controllers/authContoller'); 
const verifyToken = require('../controllers/verifyToken');


router.post('/login', authController.login);

router.post('/register_Gmail', authController.registerGmail);

router.post('/registro', verifyToken, authController.registro);

router.get('/prueba', verifyToken, authController.prueba);

module.exports = router;
