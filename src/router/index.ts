import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/", component: () => window.innerWidth > 750 ? import('../views/home/index.vue') : import('../viewsM/home/index.vue')
  },
  { path: "/article", component: () => import('../views/arcticle/index.vue') },
  {
    path: "/plan", component: () => window.innerWidth > 750 ? import('../views/plan/index.vue') : import('../viewsM/plan/index.vue')
  },
  { name: "planDetail", path: "/planDetail", component: () => window.innerWidth > 750 ? import('../views/plan/detail.vue') : import('../viewsM/plan/detail.vue') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
