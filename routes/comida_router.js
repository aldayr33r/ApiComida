const { Router } = require('express');
const router = Router();
const verifyToken = require('../controllers/verifyToken');
const platillos = require('../controllers/platillos_Controller');

router.post('/platillos',verifyToken ,platillos.newPlatillos);
router.put('/platillos/:key/:value', verifyToken, platillos.updatePlatillos);
router.get('/platillos', verifyToken, platillos.listar_todo);
router.delete('/platillos/:key/:value', verifyToken ,platillos.eliminarPlatilloPorNombre);
router.get('/platillos/:key/:value', verifyToken, platillos.buscarPlatilloPorNombre);

module.exports = router;