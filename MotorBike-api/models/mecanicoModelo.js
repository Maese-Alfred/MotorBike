import sql from '../config/database.js';

class MecanicoModel {
    async crearMecanico({nombre_mecanico, apellido_mecanico, telefono_mecanico,especialidad_mecanico,email_mecanico}) 
    {try {
        const result = await sql`
            INSERT INTO mecanicos (nombre_mecanico, apellido_mecanico, telefono_mecanico, especialidad_mecanico, email_mecanico)
            VALUES (${nombre_mecanico}, ${apellido_mecanico}, ${telefono_mecanico}, ${especialidad_mecanico}, ${email_mecanico})
            RETURNING *`;
        return result[0];

    }catch (error) {
        console.error('Error al crear el mecánico:', error);
        throw error;
    }   
}
    
        async obtenerMecanicos() {
            try {
                const result = await sql`
                    SELECT * FROM mecanicos
                `;
                return result;
            } catch (error) {
                console.error('Error al obtener los mecánicos:', error);
                throw error;
            }
        }
    
      async eliminarMecanico(id_mecanico) {
            try {
                const result = await sql`
                    DELETE FROM mecanicos WHERE id_mecanico = ${id_mecanico}
                `;
                return result;
            } catch (error) {
                console.error('Error al eliminar el mecánico:', error);
                throw error;
            }
        }

        async actualizarMecanico({id_mecanico, nombre_mecanico, apellido_mecanico, telefono_mecanico, especialidad_mecanico, email_mecanico}) {
            try {
                const result = await sql`
                    UPDATE mecanicos
                    SET nombre_mecanico = ${nombre_mecanico}, apellido_mecanico = ${apellido_mecanico}, telefono_mecanico = ${telefono_mecanico}, especialidad_mecanico = ${especialidad_mecanico}, email_mecanico = ${email_mecanico}
                    WHERE id_mecanico = ${id_mecanico}
                    RETURNING *
                `;
                return result[0];
            } catch (error) {
                console.error('Error al actualizar el mecánico:', error);
                throw error;
            }
        }
}

export default new MecanicoModel;