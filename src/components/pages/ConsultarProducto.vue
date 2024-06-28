<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <div class="card-header bg-pink text-white text-center">
          <h1>{{ 'consultar Producto'.toUpperCase() }}</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="consultarProducto" class="search-form">
            <label for="nombre">Nombre del Producto:</label>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
              <input type="text" v-model="nombreProducto" class="form-control">
            </div>
            <button type="submit" class="btn-consultar">Consultar</button>

            <div class="error-container">
              <p v-if="error" class="error-message">{{ error }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-if="producto" class="product-info">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive">
        <h3>Información del Producto:</h3>
        <table class="product-table">
          <thead>
            <tr>
              <th class="styled-header id-column">ID</th>
              <th class="styled-header name-column">Nombre</th>
              <th class="styled-header price-column">Precio</th>
              <th class="styled-header">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :class="{ 'blue-text': producto.id }">{{ producto.id }}</td>
              <td :class="{ 'blue-text': producto.nombre }">{{ producto.nombre }}</td>
              <td :class="{ 'blue-text': producto.precio }">${{ new Intl.NumberFormat("es-mx").format(producto.precio)
                }}</td>
              <td>

                <router-link :to="{
                  name: 'Actualizar',
                  params: {
                    idProducto: producto.id,
                    nombreProducto: producto.nombre,
                    precioProducto: producto.precio
                  }
                }" class="btn btn-warning">
                  <i class="fa-solid fa-edit"></i>
                </router-link>&nbsp;

                <button class="btn btn-danger" @click="eliminar(producto.id, producto.nombre)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-else-if="resultado === false" class="no-product">
    <p>Producto no encontrado.</p>
    <button class="btn-agregar" @click="reDir">Agregar</button>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>

import { confirmar } from '@/funciones';
import { AceptarEliminacion } from '@/funciones';

export default {
  props: ['id', 'activador'],
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
      if (!this.nombreProducto) {
        this.error = 'Ingrese nombre de producto';
        return; 
      }

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
          this.producto = data; 
          this.resultado = true; 
          this.error = ''; 
        })
        .catch(error => {
          console.error('Error al consultar el producto:', error.message);
          this.resultado = false; 
          this.error = error.message; 
          this.producto = null; 
        });
    },

    eliminar(id, nombre) {
      confirmar(id, nombre, (productId) => {
        fetch(`http://localhost:3000/api/eliminarProducto/${productId}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar el producto');
            }
            return response.json(); 
          })
          .then(() => {
            AceptarEliminacion();
            this.producto = null; 
            this.resultado = null;
          } 
          )
          .catch(error => {
            this.error = 'Error al eliminar el producto: ' + error.message;
          });
      });
    },

    agregarProducto() {
      this.reDir();
    },

    reDir() {
      this.$router.push({ path: '/register', params: { username: 'erina' } });
    },

    reDirActualizar() {
      this.$router.push({ path: '/Actualizar', params: { username: 'erina' } });
    },
  },
  computed: {
    resultadoMessage() {
      return this.resultado === true ? 'Producto encontrado' : 'Producto no encontrado';
    }
  }
};
</script>

<style scoped>
.btn-consultar:hover {
  background-color: #0056b3;
  background-image: linear-gradient(to right, #d600d6, #854646);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.col-lg-8 {
  margin: 0 auto;
  padding: 15px;
}

.table-responsive {
  overflow-x: auto;
}

.card-header.bg-pink {
  background-color: pink;
  color: white;
}

.text-center {
  text-align: center;
}

.search-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
}

.input-group-text {
  background-color: #f700ff;
  color: white;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 5px 0 0 5px;
  padding: 8px;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 5px 5px 0;
  margin-bottom: 10px;
}

.btn-consultar {
  background-color: #f700ff;
  background-image: linear-gradient(to right, #854646, #ff00c3);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;
  margin-bottom: 10px;
}

.btn-consultar:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(247, 0, 255, 0.5);
}

.btn-consultar:active {
  transform: scale(0.95);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.error-container {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}

.product-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #f700ff;
  border-radius: 20px;
}

.element-style {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.no-product {
  text-align: center;
  margin-top: 20px;
}

.btn-agregar {
  background-color: #f700ff;
  background-image: linear-gradient(to right, #854646, #ff00c3);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;
  margin-top: 10px;
}

.btn-agregar:hover {
  background-color: #0056b3;
  background-image: linear-gradient(to right, #d600d6, #854646);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.btn-agregar:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(247, 0, 255, 0.5);
}

.btn-agregar:active {
  transform: scale(0.95);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th.styled-header {
  background-color: #0056b3;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 16px;
}

.product-table td {
  padding: 10px;
  text-align: center;
}

.blue-text {
  color: #0056b3;
  font-weight: bold;
}
</style>