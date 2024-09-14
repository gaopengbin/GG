<template>
  <n-card
    hoverable
    :title="item.title"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    class="arcticle-box"
    :style="{ backgroundColor: color.cardColor }"
    v-for="item in arcticleList"
  >
    <!-- <template #header-extra> #header-extra </template> -->
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-image
          :src="item.cover"
          fit="cover"
          style="width: 100%; height: 150px"
        />
      </n-gi>
      <n-gi>
        {{ item.content }}
      </n-gi>
    </n-grid>

    <!-- <template #footer> #footer </template> -->
    <!-- <template #action> #action </template> -->
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useThemeVars } from "naive-ui";
const color = useThemeVars();
console.log(color.value);
const arcticleList = ref([
  {
    title: "Vue3",
    cover: "/src/assets/wallpaper/door.png",
    content: "Vue3是一个前端框架",
  },
  {
    title: "React",
    cover: "/src/assets/wallpaper/dragon.png",
    content: "React是一个前端框架",
  },
  {
    title: "Angular",
    cover: "/src/assets/wallpaper/moon.png",
    content: "Angular是一个前端框架",
  },
]);
</script>

<style scoped>
.arcticle-box {
  margin: 10px;
  padding: 10px;
  border: 1px solid #e0e0e081;
  border-radius: 5px;
  width: 60vw;
  text-align: left;
}
</style>
