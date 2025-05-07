import HistorialModel from '../models/historialModelo.js';

class HistorialController {
    async obtenerHistorialCompleto(req, res){
        try{
            const historial = await HistorialModel.obtenerHistorialCompleto();
            res.status(200).json(historial);
        }catch(error){
            console.error('Error al obtener el historial completo:', error);
            res.status(500).json({ error: 'Error al obtener el historial completo' });
        }
    }
    async registrarHistorialMantenimiento(req, res){
        const { id_orden, detalles_historial } = req.body;
        try{
            const nuevoHistorial = await HistorialModel.registrarHistorialMantenimiento({ id_orden, detalles_historial });
            res.status(201).json(nuevoHistorial);
        }catch(error){
            console.error('Error al registrar el historial de mantenimiento:', error);
            res.status(500).json({ error: 'Error al registrar el historial de mantenimiento' });
        }
    }

    async registrarTrabajoMecanico(req, res){
        const { id_mecanico, id_orden, fecha_inicio_servicio, fecha_fin_servicio, descripcion_trabajo, detalles_adicionales } = req.body;
        try{
            const nuevoTrabajo = await HistorialModel.registrarTrabajoMecanico({ id_mecanico, id_orden, fecha_inicio_servicio, fecha_fin_servicio, descripcion_trabajo, detalles_adicionales });
            res.status(201).json(nuevoTrabajo);
        }catch(error){
            console.error('Error al registrar el trabajo del mecánico:', error);
            res.status(500).json({ error: 'Error al registrar el trabajo del mecánico' });
        }
    }

    async obtenerHistorialPorMecanico(req, res){
        const { id_mecanico } = req.params;
        try{
            const historial = await HistorialModel.obtenerHistorialPorMecanico(id_mecanico);
            res.status(200).json(historial);
        }catch(error){
            console.error('Error al obtener el historial por mecánico:', error);
            res.status(500).json({ error: 'Error al obtener el historial por mecánico' });
        }
    }
}

export default new HistorialController();
