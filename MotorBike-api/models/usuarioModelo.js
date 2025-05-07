import sql from '../config/database.js';
import bcrypt from 'bcrypt';

class UsuarioModel {
  async crearUsuarioConRolYPermisos({
    nombre_usuario,
    apellido_usuario,
    telefono_usuario,
    email_usuario,
    contraseña_usuario, // <--- en texto plano
    nombre_rol_usuario,
    permisos = []
  }) {
    try {
      return await sql.begin(async (sql) => {
        // 1. Verificar o crear rol
        const rolResult = await sql`
          SELECT id_rol_usuario 
          FROM roles_usuarios 
          WHERE nombre_rol_usuario = ${nombre_rol_usuario}
        `;

        let idRol;
        if (rolResult.length > 0) {
          idRol = rolResult[0].id_rol_usuario;
        } else {
          const insertRol = await sql`
            INSERT INTO roles_usuarios (nombre_rol_usuario) 
            VALUES (${nombre_rol_usuario}) 
            RETURNING id_rol_usuario
          `;
          idRol = insertRol[0].id_rol_usuario;
        }

        // 2. Hashear la contraseña antes de insertarla
        const saltRounds = 10;
        const hash = await bcrypt.hash(contraseña_usuario, saltRounds);

        // 3. Crear usuario con contraseña hasheada
        await sql`
          INSERT INTO usuarios (
            email_usuario,
            nombre_usuario,
            apellido_usuario,
            telefono_usuario,
            contraseña_usuario,
            id_rol_usuario
          ) VALUES (
            ${email_usuario}, 
            ${nombre_usuario}, 
            ${apellido_usuario}, 
            ${telefono_usuario}, 
            ${hash},
            ${idRol}
          )
        `;

        // 4. Asignar permisos
        for (const permiso of permisos) {
          await sql`
            INSERT INTO permisos_roles (id_rol_usuario, nombre_boton, permitido)
            VALUES (${idRol}, ${permiso.nombre_boton}, ${permiso.permitido})
          `;
        }

        return { success: true, message: 'Usuario creado exitosamente' };
      });
    } catch (error) {
      console.error('Error al crear usuario, rol y permisos:', error);
      throw error;
    }
  }

  async getUsuariosWithRolesAndPermisos() {
    try {
      const usuariosConRolesPermisos = await sql`
        SELECT u.*, r.nombre_rol_usuario, p.nombre_boton, p.permitido
        FROM usuarios u
        JOIN roles_usuarios r ON u.id_rol_usuario = r.id_rol_usuario
        LEFT JOIN permisos_roles p ON r.id_rol_usuario = p.id_rol_usuario
      `;
      return usuariosConRolesPermisos;
    } catch (error) {
      console.error('Error al obtener usuarios con roles y permisos:', error);
      throw error;
    }
  }

  async getUsuarioWithEmail(email_usuario, contraseña) {
    try {
      const usuarioResult = await sql`
        SELECT u.*, r.nombre_rol_usuario, p.nombre_boton, p.permitido
        FROM usuarios u
        JOIN roles_usuarios r ON u.id_rol_usuario = r.id_rol_usuario
        LEFT JOIN permisos_roles p ON r.id_rol_usuario = p.id_rol_usuario
        WHERE u.email_usuario = ${email_usuario}
      `;

      if (usuarioResult.length > 0) {
        const usuario = usuarioResult[0];
        const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña_usuario);
        if (passwordMatch) {
          return usuario;
        } else {
          return null; // Contraseña incorrecta
        }
      } else {
        return null; // Usuario no encontrado
      }
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error;
    }
  }
}

export default new UsuarioModel()


