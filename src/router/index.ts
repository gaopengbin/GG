import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "../views/home/index.vue";
import HomeViewM from "../views/home/indexM.vue";
import Arcticle from "../views/arcticle/index.vue";
import Plan from "../views/plan/index.vue";
import PlanM from "../views/plan/indexM.vue";
import PlanDetail from "../views/plan/detail.vue";

const routes = [
  {
    path: "/", component: () => {
      if (window.innerWidth > 750) {
        return HomeView;
      } else {
        return HomeViewM;
      }
    }
  },
  { path: "/article", component: Arcticle },
  {
    path: "/plan", component: () => {
      if (window.innerWidth > 750) {
        return Plan;
      } else {
        return PlanM;
      }
    }
  },
  { path: "/planM", component: PlanM },
  { name: "planDetail", path: "/planDetail", component: PlanDetail },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
