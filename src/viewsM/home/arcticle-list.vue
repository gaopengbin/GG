<template>
  <n-card
    hoverable
    :title="item.title"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    class="arcticle-box"
    :style="{ backgroundColor: color.cardColor,marginBottom: '10px' }"
    :header-style="{
      padding: '2px 10px 2px 10px',
    }"
    :content-style="{
      padding: '5px',
    }"
    v-for="item in arcticleList"
  >
    <template #header-extra>
      <n-button type="success" text @click="goDetail(item)">
        查看详情
      </n-button>
    </template>
    <n-grid x-gap="12" :cols="2">
      <n-gi :span="1">
        <n-image :src="item.cover" fit="cover" width="300px" height="100px"/>
      </n-gi>
      <n-gi :span="1">
        {{ item.description }}
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useThemeVars } from "naive-ui";
import { useRouter } from "vue-router";
import { usePlansStore } from "../../store";
const planStore = usePlansStore();
import { planAPI } from "../../api/plan";

const router = useRouter();
const color = useThemeVars();
console.log(color.value);

const arcticleList = ref<any>([]);

// fetch("./mock/plan.json")
//   .then((res) => res.json())
//   .then((res) => {
//     arcticleList.value = res;
//   });

planAPI.getPlan().then((res) => {
  console.log(res);
  res.data.forEach((item: any) => {
    item.content = JSON.parse(item.content);
  });
  arcticleList.value = res.data;
});

const goDetail = (item: any) => {
  console.log("goDetail", item);
  planStore.setCurrentPlan(item);
  router.push({
    path: "/planDetail",
  });
};
</script>

<style scoped>
.arcticle-box {
  margin: 0px;
  padding: 0px;
  border: 1px solid #e0e0e081;
  border-radius: 5px;
  width: 100%;
  text-align: left;
}
</style>
