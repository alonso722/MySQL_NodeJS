const mysql = require('mysql2/promise');
require('dotenv').config()
async function main() {
  try {
    // Crear la conexión a la base de datos
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        port: '33060',
        database : 'demo',
        user : 'root',
        password: process.env.PASS
    });
    console.log('Conexión a MySQL establecida correctamente.');

    //Crear una tabla de ejemplo
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )
    `;
    await connection.execute(createTableQuery);
    console.log('Tabla creada exitosamente.');

    // Insertar datos de ejemplo
    const insertQuery = `
      INSERT INTO users (name, email) VALUES 
      ('John Doe', 'john@example.com'), 
      ('Jane Smith', 'jane@example.com')
    `;
    await connection.execute(insertQuery);
    console.log('Datos insertados exitosamente.');

    // Realizar una consulta de selección
    const [rows] = await connection.execute('SELECT * FROM empleados');
    console.log('Datos seleccionados:', rows);

    // Cerrar la conexión
    await connection.end();
  } catch (error) {
    console.error('Error en la conexión o consulta:', error);
  }
}

main();