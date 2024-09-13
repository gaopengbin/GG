<template>
  <n-config-provider :theme="darkTheme">
    <n-layout>
      <n-layout-header>颐和园路</n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
    <n-button>Dark Theme</n-button>
    <HelloWorld msg="Vite + Vue" />
  </n-config-provider>
</template>
<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { darkTheme } from "naive-ui";
const theme = ref();
theme.value = darkTheme;
</script>
<style>
body {
  font-family: "宋体";
}
</style>
