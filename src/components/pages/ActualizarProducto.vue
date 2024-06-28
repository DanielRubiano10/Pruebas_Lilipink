<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-pink text-white text-center">
                    <h1>{{ 'Actualizar Producto'.toUpperCase() }}</h1>
                </div>

                <div class="card-body">
                    <form @submit.prevent="actualizarProducto">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                            <input type="text" v-model="localIdProducto" id="idProducto" class="form-control"
                                maxlength="50" placeholder="Id producto" readonly>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-tag"></i></span>
                            <input type="text" v-model="localNombreProducto" id="nombreProducto" class="form-control"
                                maxlength="50" placeholder="Nombre del producto" required>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
                            <input type="text" v-model="localPrecioProducto" id="precioProducto" class="form-control"
                                maxlength="50" placeholder="Precio del producto" required>
                        </div>

                        <div class="d-grid col-6 mx-auto">
                            <button type="submit" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>
                                Actualizar</button>
                        </div>
                        
                        <div v-if="error" class="error-container">
                            <p class="error-message">{{ error }}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { AceptarActualizacion } from '@/funciones';


export default {
    props: ['idProducto', 'nombreProducto', 'precioProducto'],
    data() {
        return {
            localIdProducto: this.idProducto,
            localNombreProducto: this.nombreProducto,
            localPrecioProducto: this.precioProducto,
            error: null
        };
    },
    methods: {
        async actualizarProducto() {
            const { localIdProducto, localNombreProducto, localPrecioProducto } = this;
            const url = `http://localhost:3000/api/actualizarProducto/${localIdProducto, localNombreProducto, localPrecioProducto}`;
            console.log(url);
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre: localNombreProducto,
                        precio: localPrecioProducto
                    })
                });

                if (!response.ok) {
                    throw new Error('Error al actualizar el producto');
                }

                AceptarActualizacion();
                const data = await response.json();
                console.log(data);
                this.$router.push({ path: '/' });

            } catch (error) {
                this.error = 'Error al actualizar el producto: ' + error.message;
                console.error('Error al actualizar el producto:', error);
            }
        }
    }
};
</script>

<style scoped>
.row {
    margin: 0 auto;
    max-width: 100%;
}

.col-md-6 {
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

.btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-success:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(72, 180, 97, 0.5);
}

.btn-success:active {
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