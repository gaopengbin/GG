<template>
  <div
    class="arcticle"
    :style="{ backgroundColor: color.cardColor, textAlign: 'left' }"
  >
    <n-h2>h2 标签</n-h2>
    <n-p>
      《且听风吟》是日本作家村上春树的第一本小说。它首次出现在 1979 年 6
      月的《群像》（日本最有影响力的文学杂志之一），并于次月出版成书。这部小说被日本导演
      Kazuki Ōmori 改编成电影，并于 1981 年由艺术剧院协会发行。1987
      年被阿尔弗雷德伯恩鲍姆译成英文。
    </n-p>
    <Map />
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import Map from "../map/index.vue";

const color = useThemeVars();
</script>

<style scoped>
.arcticle {
  margin: 20px;
  padding: 20px;
  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.arcticle n-h2 {
  margin-bottom: 10px;
}
.arcticle n-p {
  line-height: 1.5;
}
</style>
