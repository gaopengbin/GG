<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
  >
    <n-layout style="width: 100vw; background-color: transparent">
      <n-layout-header style="height: 4vh; background-color: transparent">
        <Header>
          <n-switch
            v-model:value="active"
            size="medium"
            @update:value="handleChange"
          >
            <template #checked-icon>
              <n-icon :component="Moon" />
            </template>
            <template #unchecked-icon>
              <n-icon :component="Sunny" />
            </template>
          </n-switch>
          <RouterLink to="/">首页</RouterLink>
          <RouterLink to="/arcticle">文章</RouterLink>
        </Header>
      </n-layout-header>
      <n-layout-content
        content-style="height:96vh;background-color: transparent;"
      >
        <RouterView />
      </n-layout-content>
    </n-layout>
    <div class="background"></div>
  </n-config-provider>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { GlobalTheme, GlobalThemeOverrides, darkTheme } from "naive-ui";
import Header from "./views/home/header.vue";
// import Home from "./views/home/index.vue";
import Sunset from "./assets/wallpaper/sunset.png";
import Night from "./assets/wallpaper/night.png";
import { Sunny, Moon } from "@vicons/ionicons5";

const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: "rgba(255, 255, 255,0.8)",
  },
};

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: "rgba(24, 24, 28,0.5)",
  },
};

const active = ref(true);
const theme = ref<GlobalTheme | null>(darkTheme);
const handleChange = (value: boolean) => {
  value ? (theme.value = darkTheme) : (theme.value = null);
  let background: any = document.querySelector(".background");
  if (value) {
    background.style.backgroundImage = `url(${Night})`;
  } else {
    background.style.backgroundImage = `url(${Sunset})`;
  }
};
</script>
<style>
html,
body {
  font-family: "ZCOOL KuaiLe";
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-size: cover;
  background-position: center;
  /* filter: blur(10px); */
  background-image: url(./assets/wallpaper/night.png);
  transition: background-image 1s;
}
.n-layout {
  background-color: transparent;
}
</style>
