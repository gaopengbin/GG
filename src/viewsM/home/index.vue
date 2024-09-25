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
      <div style="max-height: 800px; margin: 1vh 0">
        <photoWallM />
      </div>

      <n-card>
        <n-grid x-gap="5" y-gap="5" :cols="4">
          <n-gi span="1" v-for="btn in btns">
            <n-button style="width: 15vw; height: 10vw" @click="jump(btn)">
              <template #icon>
                <n-icon>
                  <component :is="btn.icon" />
                </n-icon>
                <br />
                <n-text>{{ btn.title }}</n-text>
              </template>
            </n-button>
          </n-gi>
        </n-grid>
      </n-card>

      <div style="height: 800px; margin-top: 1vh">
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
import { Bicycle, CashOutline as CashIcon } from "@vicons/ionicons5";
import { useRouter } from "vue-router";
const router = useRouter();

const btns = ref([
  {
    title: "出行",
    icon: Bicycle,
    path: "/plan",
  },
  {
    title: "消费",
    icon: CashIcon,
    path: "/planDetail",
  },
  {
    title: "学习",
    icon: CashIcon,
  },
  {
    title: "娱乐",
    icon: CashIcon,
  },
  {
    title: "工作",
    icon: CashIcon,
  },
  {
    title: "生活",
    icon: CashIcon,
  },
  {
    title: "其他",
    icon: CashIcon,
  },
]);

const jump = (btn: any) => {
  console.log("jump", btn);
  // planStore.setCurrentPlan(item);
  router.push(btn.path);
};
</script>

<style scoped>
.jitang {
  margin-top: 10px;
  font-size: 16px;
  font-style: italic;
}
</style>
