const mysql = require('mysql2/promise');
require('dotenv').config()

// Configurar el pool de conexiones
const pool = mysql.createPool({
    host: 'localhost',
    port: '33060',
    database : 'demo',
    user : 'root',
    password: process.env.PASS,
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0 // Sin límite en la cola de conexiones
});

async function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `;
  const [results] = await pool.query(createTableQuery);
  console.log('Tabla creada exitosamente:', results);
}

async function insertData() {
  const insertQuery = `
    INSERT INTO users (name, email) VALUES 
    ('John Doe', 'john@example.com'), 
    ('Jane Smith', 'jane@example.com')
  `;
  const [results] = await pool.query(insertQuery);
  console.log('Datos insertados:', results);
}

async function selectData() {
  const [rows] = await pool.query('SELECT * FROM users');
  console.log('Datos seleccionados:', rows);
  return rows;
}

async function main() {
  try {
    // Crear la tabla y realizar las operaciones de inserción y selección
    await createTable();
    await insertData();
    const data = await selectData();
    console.log('Resultado de la consulta:', data);
  } catch (error) {
    console.error('Error en la conexión o consulta:', error);
  } finally {
    // Cerrar el pool al finalizar las consultas
    await pool.end();
  }
}

// Ejecutar la función principal
main();
