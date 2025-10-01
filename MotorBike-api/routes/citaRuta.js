import CitaController from "../controllers/citaControlador.js";
import express from "express";

const router = express.Router();

// Crear una nueva cita
router.post("/", CitaController.crearCita);

// Confirmar una cita específica por ID
router.put("/:id_cita/confirmar", CitaController.confirmarCita);

// Obtener todas las citas con detalles de cliente, moto y servicio
router.get("/detalles", CitaController.obtenerCitasConDetalles);
router.get("/hora/:fecha_cita", CitaController.geCitaPorHora);

export default router;