import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "uno.css";
import naive from "naive-ui";
import { router } from "./router/index";
import "vue3-openlayers/styles.css";
import OpenLayersMap from "vue3-openlayers";

createApp(App).use(router).use(naive).use(OpenLayersMap).mount("#app");
