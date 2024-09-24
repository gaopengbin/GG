import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "uno.css";
// import naive from "naive-ui";
import { router } from "./router/index";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(router).use(pinia).mount("#app");
