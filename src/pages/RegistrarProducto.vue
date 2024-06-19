<template>
    <div class="product-form">
        <h2>Registrar Producto</h2>
        <form @submit.prevent="registerProduct">
            <div class="form-group">
                <label for="nombre">Nombre del Producto:</label>
                <input type="text" id="nombre" v-model="nombre" required class="form-control" />
            </div>
            <div class="form-group">
                <label for="precio">Precio del Producto:</label>
                <input type="number" id="precio" v-model.number="precio" required class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Registrar Producto</button>
            <p v-if="registroExitoso" class="success-message">Producto registrado correctamente.</p>
            <p v-if="registroFallido" class="error-message">Error al registrar el producto.</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            nombre: '',
            precio: '',
            registroExitoso: false,
            registroFallido: false
        };
    },
    methods: {
        registerProduct() {
            // Reiniciar estados de validación
            this.registroExitoso = false;
            this.registroFallido = false;

            // Enviar los datos del nuevo producto al servidor
            axios.post('http://localhost:3000/api/RegistrarProductos', {
                nombre: this.nombre,
                precio: this.precio
            })
                .then(response => {
                    console.log('Producto registrado correctamente:', response.data);
                    // Indicar que el registro fue exitoso
                    this.registroExitoso = true;
                    this.registroFallido = false;

                    // Limpiar campos del formulario
                    this.nombre = '';
                    this.precio = '';
                })
                .catch(error => {
                    console.error('Error al registrar el producto:', error);
                    // Indicar que hubo un error en el registro
                    this.registroExitoso = false;
                    this.registroFallido = true;
                });
        }
    }
};
</script>

<style scoped>
.product-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-form h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.success-message {
    color: green;
    margin-top: 10px;
    text-align: center;
}

.error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
}
</style>