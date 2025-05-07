import sql from '../config/database.js';

class ServicioModel {
    async obtenerTodos() {
      const result = await sql.query(`SELECT * FROM servicios`);
      return result.rows;
    }
  
    async crearServicio({ nombre_servicio, descripcion_servicio, costo_estimado_servicio, duracion_aproximada_servicio }) {
      const result = await sql.query(
        `INSERT INTO servicios (nombre_servicio, descripcion_servicio, costo_estimado_servicio, duracion_aproximada_servicio)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [nombre_servicio, descripcion_servicio, costo_estimado_servicio, duracion_aproximada_servicio]
      );
      return result.rows[0];
    }
  };

  export default new ServicioModel;