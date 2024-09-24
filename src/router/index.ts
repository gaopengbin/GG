import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/", component: () => window.innerWidth > 750 ? import('../views/home/index.vue') : import('../views/home/indexM.vue')
  },
  { path: "/article", component: () => import('../views/arcticle/index.vue') },
  {
    path: "/plan", component: () => window.innerWidth > 750 ? import('../views/plan/index.vue') : import('../views/plan/indexM.vue')
  },
  { path: "/planM", component: () => import('../views/plan/indexM.vue') },
  { name: "planDetail", path: "/planDetail", component: () => import('../views/plan/detail.vue') },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
