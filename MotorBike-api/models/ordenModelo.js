import sql from '../config/database.js';

class OrdenModel {
    async obtenerOrdenes() {
        try{
        const result = await sql `
          SELECT os.*, c.nombre_cliente, m.marca_moto, s.nombre_servicio
          FROM ordenes_servicio os
          JOIN motos m ON os.placa_moto = m.placa_moto
          JOIN clientes c ON m.cedula_cliente = c.cedula_cliente
          JOIN servicios s ON os.id_servicio = s.id_servicio
          ORDER BY os.fecha_ingreso_orden DESC
        `;
        return result;
      }
      catch (error) {
        console.error('Error al obtener las ordenes:', error);
        throw error;
      }
    }
    
      async actualizarEstado(id_orden, nuevoEstado) {
        const result = await sql.query(
          `UPDATE ordenes_servicio SET estado_orden = $2 WHERE id_orden = $1 RETURNING *`,
          [id_orden, nuevoEstado]
        );
        return result.rows[0];
      }
}

export default new OrdenModel;