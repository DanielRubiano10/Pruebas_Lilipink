const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

async function main() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "procesos",
  });

  // Ruta para consultar si un producto existe
  app.get("/api/ConsultaProductos", async (req, res) => {
    const nombreProducto = req.query.nombre;

    if (!nombreProducto) {
      res.status(400).send("Por favor proporciona un nombre de producto.");
      return;
    }

    try {
      const [results] = await connection.execute(
        "SELECT COUNT(*) AS count FROM productos WHERE nombre = ?",
        [nombreProducto]
      );
      const count = results[0].count;
      res.json({ exists: count > 0 });
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).send("Error al ejecutar la consulta");
    }
  });

  app.post("/api/RegistrarProductos", async (req, res) => {
    const { nombre, precio } = req.body;

    try {
      await connection.execute(
        "INSERT INTO productos (nombre, precio) VALUES (?, ?)",
        [nombre, precio]
      );
      res.status(201).send("Producto insertado correctamente.");
    } catch (error) {
      console.error("Error al insertar el producto:", error);
      res.status(500).send("Error al insertar el producto.");
    }
  });

  // Ruta para traer la información de un producto
  app.get("/api/DescripcionProductos", async (req, res) => {
    const nombreProducto = req.query.nombre;

    if (!nombreProducto) {
      res.status(400).send("Por favor proporciona un nombre de producto.");
      return;
    }

    try {
      const [results] = await connection.execute(
        "SELECT id_productos as id, nombre, precio FROM productos WHERE nombre = ?",
        [nombreProducto]
      );

      if (results.length === 0) {
        res.status(404).send("Producto no encontrado.");
        return;
      }

      // Si se encontró el producto, devolver los datos
      const producto = results[0];
      res.json(producto);
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).send("Error al ejecutar la consulta");
    }
  });

  // Ruta DELETE para eliminar un producto por su ID
  app.delete("/api/eliminarProducto/:id", async (req, res) => {
    const productId = req.params.id;
    const query = "DELETE FROM productos WHERE id_productos = ?";

    try {
      const [results] = await connection.execute(query, [productId]);

      // Verificar si se eliminó algún registro
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No se encontró el producto para eliminar" });
      }

      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  });

  app.put('/api/actualizarProducto/:id', async (req, res) => {
    const productId = req.params.id;
    const { nombre, precio } = req.body;
  
    console.log('Request Body:', req.body); // Log del cuerpo de la solicitud
  
    if (!nombre || !precio) {
      console.error('Nombre o precio faltantes');
      return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }
  
    try {
      const sql = 'UPDATE productos SET nombre = ?, precio = ? WHERE id_productos = ?';
      const [result] = await connection.execute(sql, [nombre, precio, productId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No se encontró el producto para actualizar' });
      }
  
      res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error actualizando el producto' });
    }
  });

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});
