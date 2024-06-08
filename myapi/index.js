const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');


const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',     // Host del servidor MySQL
    user: 'root',          // Usuario de MySQL
    password: '',          // Contraseña de MySQL (por defecto, sin contraseña en XAMPP)
    database: 'procesos'  // Nombre de la base de datos
});

// Conectar a la base de datos
connection.connect(error => {
    if (error) {
        console.error('Error de conexión a la base de datos:', error);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Ruta para obtener datos de los productos de base de datos
app.get('/api/ConsultaProductos', (req, res) => {
    const query = 'SELECT id_productos, nombre FROM productos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error al ejecutar la consulta');
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener los detalles de un producto específico por ID
app.get('/api/SeleccionarProductos/:id_productos', (req, res) => {
    const { id_productos } = req.params;
    const query = 'SELECT * FROM productos WHERE id_productos = ?';
    connection.query(query, [id_productos], (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).send('Error al ejecutar la consulta');
            return;
        }
        res.json(results[0]); // Asumiendo que el id_producto es único y sólo devuelve un registro
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor ejecutándose en http://localhost:${port}');
});