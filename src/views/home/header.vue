<template>
  <n-split :default-size="0.4" :resize-trigger-size="0">
    <template #1>
      <n-space
        justify="start"
        style="height: 100%; align-items: center; padding-left: 5px"
      >
        <n-avatar
          size="small"
          round
          style="margin-top: 5px"
          :src="Logo"
        />
        <n-space style="margin-left: 5px">
          <n-text
            style="font-size: 20px; font-weight: bold; font-style: italic"
            class="font-lato"
            >Laogao</n-text
          >
        </n-space>
      </n-space>
    </template>
    <template #2>
      <n-space
        justify="end"
        style="height: 100%; align-items: center; padding-right: 10px"
        :wrap="false"
      >
        <n-menu
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
          responsive
          @update:value="handleUpdateValue"
          style="height: 100%"
        />
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
import { BicycleOutline, BookOutline, HomeOutline as HomeIcon } from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import Logo from "@/assets/avatar/logo.png";

const router = useRouter();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const activeKey = ref("home");

const menuOptions: MenuOption[] = [
  {
    label: "首页",
    key: "home",
    icon: renderIcon(HomeIcon),
    path: "/",
  },
  // {
  //   label: "文章",
  //   key: "article",
  //   icon: renderIcon(BookOutline),
  //   path: "/article",
  // },
  {
    label: "出行",
    key: "plan",
    icon: renderIcon(BicycleOutline),
    path: "/plan",
  }
];
// const message = useMessage();
function handleUpdateValue(key: string, item: any) {
  console.log(key, item);
  router.push(item.path);
  // message.info(`[onUpdate:value]: ${JSON.stringify(key)}`);
  // message.info(`[onUpdate:value]: ${JSON.stringify(item)}`);
}
</script>

<style scoped></style>
