import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "../views/home/index.vue";
import Arcticle from "../views/arcticle/index.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/arcticle", component: Arcticle },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
