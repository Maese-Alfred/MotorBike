import MotoController from '../controllers/motoControlador.js';
import express from 'express';

const router = express.Router();

// Rutas para el CRUD de motos
router.post('/motos', MotoController.crearMoto); // Crear una nueva moto
router.get('/motos', MotoController.obtenerMotos); // Obtener todas las motos
router.get('/motos/:placa_moto', MotoController.obtenerMotoPorPlaca); // Obtener una moto por placa
router.put('/motos/:placa_moto', MotoController.actualizarMoto); // Actualizar una moto por placa
router.delete('/motos/:placa_moto', MotoController.eliminarMoto); // Eliminar una moto por placa

export default router;