const { Router } = require('express');
const router = Router();
const list = require('../controllers/ListarController'); 
const authController = require('../controllers/authContoller'); 
const verifyToken = require('../controllers/verifyToken')

router.get('/listar_todo', verifyToken, list.listar_todo);
router.delete('/eliminar/:nombre', verifyToken ,list.eliminarPlatilloPorNombre);
router.get('/listar/:nombre', verifyToken, list.buscarPlatilloPorNombre);

module.exports = router;