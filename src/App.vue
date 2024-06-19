<template>
  <nav>
    <!-- <router-link to="/">Home</router-link>|
    <router-link to="/register">register</router-link>     -->
    <a href="/">Home</a>
    <a href="/register">register</a>
    <button @click="reDir()">redirect</button>
  </nav>
  <main>
    <!-- <RouterView  /> -->
    <router-view />
  </main>
</template>

<script>
// import ActualizarProductos from './components/MyComponent.vue'
// import ActualizarProductos from './components/ActualizarProductos.vue'

export default {
  name: 'App',
  components: {
    // 'main-component': ActualizarProductos
  },
  data() {
    return {
      xxx: '', // Modelo para almacenar el nombre del producto
      resultado: null // Variable para almacenar el resultado de la consulta
    };
  },
  methods: {
    eventooo(e) {
      console.log(`@click="ejemploEmmit()::${e}"`);
    },
    reDir(){
      this.$router.push({ name: 'register', params: { username: 'erina' } })
    }
  }
}
</script>
