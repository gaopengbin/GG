<template>
  <n-split :default-size="0.8">
    <template #1>
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
        responsive
        @update:value="handleUpdateValue"
        style="height: 100%;"
      />
    </template>
    <template #2>
      <n-space
        justify="end"
        style="height: 100%; align-items: center; padding-right: 10px"
      >
        <slot></slot>
      </n-space>
    </template>
  </n-split>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { h, ref } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
// import { RouterLink } from "vue-router";
import {
  HomeOutline as HomeIcon,
} from "@vicons/ionicons5";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const activeKey = ref("home");

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(HomeIcon),
  },
];
// const message = useMessage();
function handleUpdateValue(key: string, item: MenuOption) {
  // message.info(`[onUpdate:value]: ${JSON.stringify(key)}`);
  // message.info(`[onUpdate:value]: ${JSON.stringify(item)}`);
}
</script>

<style scoped></style>
