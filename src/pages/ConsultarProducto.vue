<template>
  <div class="product-container">
    <h1 class="title">{{ 'Consulta de Producto'.toUpperCase() }}</h1>
    <form @submit.prevent="consultarProducto" class="search-form">
      <label for="nombre">Nombre del Producto:</label>
      <input type="text" v-model="nombreProducto" class="input-text">
      <button type="submit" class="btn-consultar">Consultar</button>
    </form>

    <div v-if="producto" class="product-info">
      <h3>Información del Producto:</h3>
      <table class="product-table">
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Opciones</th>
        </tr>
        <tr>
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.precio }}</td>
          <td>
            <button class="btn-actualizar">Actualizar</button>
            <button class="btn-eliminar">Eliminar</button>
          </td>
        </tr>
      </table>
    </div>

    <div v-else-if="resultado === false" class="no-product">
      <p>Producto no encontrado.</p>
      <button class="btn-agregar" @click="agregarProducto">Agregar Producto</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      nombreProducto: '',
      producto: null,
      resultado: null,
      error: ''
    };
  },
  methods: {
    consultarProducto() {
      if (this.nombreProducto) {
        fetch(`http://localhost:3000/api/DescripcionProductos?nombre=${encodeURIComponent(this.nombreProducto)}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al consultar el producto');
            }
            return response.json();
          })
          .then(data => {
            if (data.error) {
              throw new Error(data.error);
            }
            this.producto = data; // Asignar el producto obtenido
            this.resultado = true; // Indicar que se encontró el producto
            this.error = ''; // Limpiar el error si hubo
          })
          .catch(error => {
            console.error('Error al consultar el producto:', error.message);
            this.resultado = false; // Indicar que no se encontró el producto
            this.error = error.message; // Mostrar mensaje de error
            this.producto = null; // Limpiar producto en caso de error
          });
      }
    },
    agregarProducto() {
      // Lógica para agregar un producto nuevo (puede ser redirigir a otra página, abrir un modal, etc.)
      console.log('Agregar Producto');
    }
  },
  computed: {
    resultadoMessage() {
      return this.resultado === true ? 'Producto encontrado' : 'Producto no encontrado';
    }
  }
};
</script>

<style scoped>
.product-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.search-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.input-text {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-consultar {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-consultar:hover {
  background-color: #0056b3;
}

.product-info {
  margin-top: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.product-table th,
.product-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.product-table th {
  background-color: #f2f2f2;
}

.btn-actualizar,
.btn-eliminar,
.btn-agregar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-actualizar:hover,
.btn-eliminar:hover,
.btn-agregar:hover {
  background-color: #218838;
}

.no-product {
  margin-top: 20px;
  text-align: center;
  color: #dc3545;
}
</style>
