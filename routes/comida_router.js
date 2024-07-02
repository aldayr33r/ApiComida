const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');
const platillos = require('../controllers/platillos_Controller');

router.post('/anadir_platillo',verifyToken ,platillos.newPlatillos);
router.put('/actualizar_platillos/:nombre', verifyToken, platillos.updatePlatillos);
router.get('/listar_todo', verifyToken, platillos.listar_todo);
router.delete('/eliminar/:nombre', verifyToken ,platillos.eliminarPlatilloPorNombre);
router.get('/listar/:nombre', verifyToken, platillos.buscarPlatilloPorNombre);

module.exports = router;