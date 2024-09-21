import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "../views/home/index.vue";
import Arcticle from "../views/arcticle/index.vue";
import Plan from "../views/plan/index.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/article", component: Arcticle },
  { path: "/plan", component: Plan },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
