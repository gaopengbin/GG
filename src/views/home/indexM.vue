<template>
  <n-scrollbar style="max-height: 1200px">
    <div
      style="
        padding: 10px;
        align-items: center;
        text-align: center;
        display: flex;
        flex-direction: column;
      "
    >
      <n-card
        hoverable
        style="max-width: 90%; margin-top: 10%; background-color: transparent"
      >
        <div
          style="font-size: 20px; font-style: oblique; font-weight: bold"
          class="font-mono"
        >
          Welcome To Laogao's Website
        </div>
        <div style="font-size: 24px" class="font-chinese">我是老高</div>
        <div style="font-size: 18px; font-style: italic" class="font-lato">
          Hope Everything Goes Well
        </div>
        <div class="jitang font-chinese">
          <div>
            <n-divider dashed>
              啊哈哈哈，鸡汤来咯~~~🥣<n-button text @click="getJitang"
                >换一碗</n-button
              >
            </n-divider>
          </div>
          <div>{{ jitang }}</div>
        </div>
      </n-card>
      <div style="max-height: 800px; margin-top: 5vh">
        <photoWallM />
      </div>

      <div style="height: 800px; margin-top: 10vh">
        <n-grid x-gap="12" :cols="1">
          <n-gi span="1">
            <arcticleList />
          </n-gi>
          <n-gi span="1">
            <something />
          </n-gi>
        </n-grid>
      </div>
    </div>

    <n-back-top :right="100" />
  </n-scrollbar>
</template>

<script setup lang="ts">
import photoWallM from "./photo-wall-M.vue";
import arcticleList from "./arcticle-list.vue";
import something from "./something.vue";
import { ref } from "vue";
import axios from "axios";
const jitang = ref<string>("");
const getJitang = async () => {
  const res = await axios.get(
    "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json"
  );
  jitang.value = res.data.text;
};
getJitang();
</script>

<style scoped>
.jitang {
  margin-top: 10px;
  font-size: 16px;
  font-style: italic;
}
</style>
