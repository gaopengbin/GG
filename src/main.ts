import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "uno.css";
import naive from "naive-ui";
import { router } from "./router/index";

createApp(App).use(router).use(naive).mount("#app");
