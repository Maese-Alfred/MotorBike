// Importa la conexión a la base de datos
import sql from '../config/database.js';

class HistorialModel {
  // Obtener historial completo de mantenimientos
  async obtenerHistorialCompleto() {
    try {
      const result = await sql`
        SELECT 
          hm.id_historial,
          hm.fecha_historial,
          hm.detalles_historial,

          os.id_orden,
          os.fecha_ingreso_orden,
          os.fecha_entrega_orden,
          os.estado_orden,

          mo.placa_moto,
          mo.marca_moto,
          mo.modelo_moto,

          c.nombre_cliente,
          c.apellido_cliente,

          s.nombre_servicio,

          hsm.id_mecanico,
          me.nombre_mecanico,
          me.apellido_mecanico,
          hsm.fecha_inicio_servicio,
          hsm.fecha_fin_servicio,
          hsm.descripcion_trabajo,
          hsm.detalles_adicionales

        FROM historial_mantenimientos hm
        JOIN ordenes_servicio os ON hm.id_orden = os.id_orden
        JOIN motos mo ON os.placa_moto = mo.placa_moto
        JOIN clientes c ON mo.cedula_cliente = c.cedula_cliente
        JOIN servicios s ON os.id_servicio = s.id_servicio

        LEFT JOIN historial_servicios_mecanicos hsm ON os.id_orden = hsm.id_orden
        LEFT JOIN mecanicos me ON hsm.id_mecanico = me.id_mecanico
      `;
      return result;
    } catch (error) {
      console.error('Error al obtener el historial completo:', error);
      throw error;
    }
  }

  // Registrar resumen final de mantenimiento
  async registrarHistorialMantenimiento({ id_orden, detalles_historial }) {
    try {
      const result = await sql`
        INSERT INTO historial_mantenimientos (id_orden, fecha_historial, detalles_historial)
        VALUES (${id_orden}, NOW(), ${detalles_historial})
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error al registrar el historial de mantenimiento:', error);
      throw error;
    }
  }

  // Registrar trabajo de un mecánico
  async registrarTrabajoMecanico({ id_mecanico, id_orden, fecha_inicio_servicio, fecha_fin_servicio, descripcion_trabajo, detalles_adicionales }) {
    try {
      const result = await sql`
        INSERT INTO historial_servicios_mecanicos (id_mecanico, id_orden, fecha_inicio_servicio, fecha_fin_servicio, descripcion_trabajo, detalles_adicionales)
        VALUES (${id_mecanico}, ${id_orden}, ${fecha_inicio_servicio}, ${fecha_fin_servicio}, ${descripcion_trabajo}, ${detalles_adicionales})
        RETURNING *
      `;
      return result[0];
    } catch (error) {
      console.error('Error al registrar el trabajo del mecánico:', error);
      throw error;
    }
  }
  
  async obtenerHistorialPorMecanico(id_mecanico) {
    try {
      const result = await sql`
        SELECT 
          hm.id_historial,
          hm.fecha_historial,
          hm.detalles_historial,

          os.id_orden,
          os.fecha_ingreso_orden,
          os.fecha_entrega_orden,
          os.estado_orden,

          mo.placa_moto,
          mo.marca_moto,
          mo.modelo_moto,

          c.nombre_cliente,
          c.apellido_cliente,

          s.nombre_servicio,

          hsm.id_mecanico,
          me.nombre_mecanico,
          me.apellido_mecanico,
          hsm.fecha_inicio_servicio,
          hsm.fecha_fin_servicio,
          hsm.descripcion_trabajo,
          hsm.detalles_adicionales
        FROM historial_mantenimientos hm
        JOIN ordenes_servicio os ON hm.id_orden = os.id_orden
        JOIN motos mo ON os.placa_moto = mo.placa_moto
        JOIN clientes c ON mo.cedula_cliente = c.cedula_cliente
        JOIN servicios s ON os.id_servicio = s.id_servicio
        LEFT JOIN historial_servicios_mecanicos hsm ON os.id_orden = hsm.id_orden
        LEFT JOIN mecanicos me ON hsm.id_mecanico = me.id_mecanico
        WHERE hsm.id_mecanico = ${id_mecanico}
      `;
      return result;
    } catch (error) {
      console.error('Error al obtener el historial por mecánico:', error);
      throw error;
    }
}
  
}

export default new HistorialModel();