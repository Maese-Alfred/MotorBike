import ordenModel from '../models/ordenModelo.js';

class OrdenController {
    async obtenerOrdenes(req, res) {
        try {
            const ordenes = await ordenModel.obtenerOrdenes();
            res.status(200).json(ordenes);
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
            res.status(500).json({ error: 'Error al obtener las órdenes' });
        }
    }

    async actualizarEstado(req, res) {
        const { id_orden } = req.params;
        const { nuevoEstado } = req.body;

        try {
            const ordenActualizada = await ordenModel.actualizarEstado(id_orden, nuevoEstado);
            res.status(200).json(ordenActualizada);
        } catch (error) {
            console.error('Error al actualizar el estado de la orden:', error);
            res.status(500).json({ error: 'Error al actualizar el estado de la orden' });
        }
    }
}

export default new OrdenController();