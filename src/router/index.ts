import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () =>
      window.innerWidth > 750
        ? import("../views/home/index.vue")
        : import("../viewsM/home/index.vue"),
  },
  {
    path: "/reader",
    component: () =>
      window.innerWidth > 750
        ? import("../views/reader/index.vue")
        : import("../viewsM/reader/index.vue"),
  },
  {
    path: "/book/:id",
    component: () =>
      window.innerWidth > 750
        ? import("../views/reader/read.vue")
        : import("../viewsM/reader/read.vue"),
  },
  { path: "/article", component: () => import("../views/arcticle/index.vue") },
  {
    path: "/plan",
    component: () =>
      window.innerWidth > 750
        ? import("../views/plan/index.vue")
        : import("../viewsM/plan/index.vue"),
  },
  {
    name: "planDetail",
    path: "/planDetail",
    component: () =>
      window.innerWidth > 750
        ? import("../views/plan/detail.vue")
        : import("../viewsM/plan/detail.vue"),
  },
  {
    path: "/findPOI",
    component: () =>
      window.innerWidth > 750
        ? import("../views/plan/findPOI.vue")
        : import("../viewsM/plan/findPOI.vue"),
  },
  {
    path: "/addPerson",
    component: () =>
      window.innerWidth > 750
        ? import("../views/plan/addPerson.vue")
        : import("../viewsM/plan/addPerson.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
