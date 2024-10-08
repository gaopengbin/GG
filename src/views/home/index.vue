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
        style="max-width: 60%; margin-top: 10%; background-color: transparent"
      >
        <div
          style="font-size: 40px; font-style: oblique; font-weight: bold"
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
      <div style="max-height: 800px; margin-top: 15vh">
        <photoWall />
      </div>
      <div style="margin-top: 10vh">
        <n-grid x-gap="12" :cols="3">
          <n-gi span="2">
            <arcticleList />
          </n-gi>
          <n-gi span="1">
            <something />
          </n-gi>
        </n-grid>
      </div>
    </div>
    <div class="beian">
      <n-space justify="end">
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=11011402054365"
          rel="noreferrer"
          target="_blank"
          ><img src="../../assets/备案图标.png" style="width: 16px;height: 16px;">京公网安备11011402054365</a
        >
        <a href="https://beian.miit.gov.cn" target="_blank"
          >豫ICP备2024091391号-1</a
        >
        <n-text> Copyright © 2024 by Laogao </n-text>
      </n-space>
    </div>
    <n-back-top :right="100" />
  </n-scrollbar>
</template>

<script setup lang="ts">
import photoWall from "./photo-wall.vue";
import arcticleList from "./arcticle-list.vue";
import something from "./something.vue";
import { ref } from "vue";
import axios from "axios";
console.log("index");
const jitang = ref<string>("");
const getJitang = async () => {
  const res = await axios.get(
    "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json"
  );
  jitang.value = res.data.text;
};
// getJitang();
</script>

<style scoped>
.jitang {
  margin-top: 10px;
  font-size: 16px;
  font-style: italic;
}
.beian {
  text-align: center;
  padding: 20px;
  background-color: #1e1e1e;
  font-family: sans-serif;
  /* position: absolute; */
  /* bottom: 10px;
  right: 10px;
  font-size: 12px; */
}
.beian a {
  color: #fff;
  display: flex;
  align-items: center;
}
</style>
