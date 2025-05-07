import CitaController from "../controllers/citaControlador.js";
import express from "express";

const router = express.Router();

// Crear una nueva cita
router.post("/citas", CitaController.crearCita);

// Confirmar una cita específica por ID
router.put("/citas/:id_cita/confirmar", CitaController.confirmarCita);

// Obtener todas las citas con detalles de cliente, moto y servicio
router.get("/citas/detalles", CitaController.obtenerCitasConDetalles);

export default router;