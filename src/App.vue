<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld :msg="varrr" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: () => ({
    varrr: null,
    dformat: null
  }),
  methods: {
    increment() {

      setInterval(() => {
        this.date();
      }, 800);
    },
    date() {
      this.varrr = new Date
      this.dformat = [this.varrr.getMonth() + 1,
      this.varrr.getDate(),
      this.varrr.getFullYear()].join('/') + ' ' +
        [this.varrr.getHours(),
        this.varrr.getMinutes(),
        this.varrr.getSeconds()].join(':');

    }
  },
  mounted() {
    // alert(`The initial count is.`)
    this.increment();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
