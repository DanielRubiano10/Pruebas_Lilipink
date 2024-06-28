import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "./App.vue";
import ConsultarProducto from "./components/pages/ConsultarProducto.vue";
import Actualizar from "./components/pages/ActualizarProducto.vue";
import Registrar from "./components/pages/RegistrarProducto.vue";
import Eliminar from "./components/pages/EliminarProducto.vue";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const routes = [
  {
    path: "/",
    name: "home",
    component: ConsultarProducto,
  },
  {
    path: "/Actualizar/:idProducto/:nombreProducto/:precioProducto", //muestra la pagina actualizar producto especificando su ID
    name: "Actualizar",
    component: Actualizar,
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: Registrar,
  },
  {
    path: "/eliminar",
    name: "Eliminar",
    component: Eliminar,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("to::", to);
  console.log("from::", from);

  next();
});

createApp(App).use(router).mount("#app");
