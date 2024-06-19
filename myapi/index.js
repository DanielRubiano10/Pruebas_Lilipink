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



  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});
