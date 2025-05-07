import OrdenController from '../controllers/ordenControlador.js';
import express from 'express';

const router = express.Router();

router.get('/ordenes', OrdenController.obtenerOrdenes);
router.put('/ordenes/:id_orden/estado', OrdenController.actualizarEstado);

export default router;
