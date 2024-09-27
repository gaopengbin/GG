<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
  >
    <van-config-provider :theme="themeM">
      <n-layout style="width: 100vw; background-color: transparent">
        <n-layout-header style="height: 5vh; background-color: transparent">
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
          </Header>
        </n-layout-header>
        <n-layout-content
          content-style="height:95vh;background-color: transparent;"
        >
          <RouterView />
        </n-layout-content>
      </n-layout>
      <div class="background"></div>
    </van-config-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { GlobalTheme, GlobalThemeOverrides, darkTheme } from "naive-ui";
import Sunset from "./assets/wallpaper/sunset.png";
import Night from "./assets/wallpaper/night.png";
import { Sunny, Moon } from "@vicons/ionicons5";
import AMapLoader from "@amap/amap-jsapi-loader";
const themeM: any = ref("dark");
const Header = defineAsyncComponent(() =>
  window.innerWidth > 750
    ? import("./views/home/header.vue")
    : import("./viewsM/home/header.vue")
);

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
    if (window.map) {
      window.map.setMapStyle("amap://styles/darkblue");
    }
    themeM.value = "dark";
    background.style.backgroundImage = `url(${Night})`;
  } else {
    if (window.map) {
      window.map.setMapStyle("amap://styles/fresh");
    }
    themeM.value = "light";
    background.style.backgroundImage = `url(${Sunset})`;
  }
};

window._AMapSecurityConfig = {
  securityJsCode: "649d0df720c956d7cafdc550a59dfbe0",
};
AMapLoader.load({
  key: "9ad9fa28a46a93b65425f18776b16fb9", // 申请好的Web端开发者Key，首次调用 load 时必填
  version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [
    "AMap.AutoComplete",
    "AMap.Driving",
    "AMap.Transfer",
    "AMap.Walking",
    "AMap.Riding",
    "AMap.Weather",
    "AMap.Geolocation",
  ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
}).then((AMap) => {
  window.AMap = AMap;
});
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
