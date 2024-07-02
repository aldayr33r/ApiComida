const { Router } = require('express');
const router = Router();
const list = require('../controllers/ListarController'); 
const verifyToken = require('../controllers/verifyToken');
const platillos = require('../controllers/platillos_Controller');

router.post('/anadir_platillo',verifyToken ,platillos.newPlatillos);
router.put('/actualizar_platillos/:nombre', verifyToken, platillos.updatePlatillos);
router.get('/listar_todo', verifyToken, list.listar_todo);
router.delete('/eliminar/:nombre', verifyToken ,list.eliminarPlatilloPorNombre);
router.get('/listar/:nombre', verifyToken, list.buscarPlatilloPorNombre);

module.exports = router;