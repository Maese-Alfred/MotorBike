import MecanicoController from '../controllers/mecanicoControlador.js';
import { Router } from 'express';

const router = Router();

// Rutas para el CRUD de mecánicos
router.post('/mecanicos', MecanicoController.crearMecanico); // Crear un nuevo mecánico
router.get('/mecanicos', MecanicoController.obtenerMecanicos); // Obtener todos los mecánicos
router.delete('/mecanicos/:id_mecanico', MecanicoController.eliminarMecanico); // Eliminar un mecánico por ID
router.put('/mecanicos/:id_mecanico', MecanicoController.actualizarMecanico); // Actualizar un mecánico por ID

export default router;