<template>
  <div class="product-container">
    <h1 class="title">{{ 'Eliminar Producto'.toUpperCase() }}</h1>
    <form @submit.prevent="eliminarProducto" class="delete-form">
      <label for="nombre">Nombre del Producto:</label>
      <input type="text" v-model="nombreProducto" class="input-text" required>
      
      <button type="submit" class="btn-eliminar">Eliminar</button>
      
      <div class="error-container">
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombreProducto: '',
      error: ''
    };
  },
  methods: {
    eliminarProducto() {
      if (!this.nombreProducto) {
        this.error = 'Ingrese nombre de producto';
        return;
      }

      if (!confirm('¿Está seguro que quiere eliminar el producto?')) {
        return;
      }

      fetch(`http://localhost:3000/api/EliminarProducto?nombre=${encodeURIComponent(this.nombreProducto)}`, {
        method: "DELETE"
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el producto');
        }
        return response.text();
      })
      .then(data => {
        alert(data);
        this.$router.push({ path: '/' }); 
      })
      .catch(error => {
        this.error = error.message;
      });
    }
  }
};
</script>

<style scoped>
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

.delete-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.input-text {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.btn-eliminar {
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

.btn-eliminar:hover {
  background-color: #0056b3;
  background-image: linear-gradient(to right, #d600d6, #854646);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.btn-eliminar:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(247, 0, 255, 0.5);
}

.btn-eliminar:active {
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
</style>
