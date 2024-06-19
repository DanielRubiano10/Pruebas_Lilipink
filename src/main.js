import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "./App.vue";
import ConsultarProducto from "./pages/ConsultarProducto.vue";
import Registrar from "./pages/RegistrarProducto.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: ConsultarProducto,
  },
  {
    path: "/register/:username",
    name: "register",
    component: Registrar,
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
