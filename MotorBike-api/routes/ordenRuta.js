import OrdenController from '../controllers/ordenControlador.js';
import express from 'express';

const router = express.Router();

router.get('/', OrdenController.obtenerOrdenes);
router.put('/:id_orden/estado', OrdenController.actualizarEstado);
router.get('/completadas', OrdenController.obtenerOrdenesCompletadas);

export default router;
