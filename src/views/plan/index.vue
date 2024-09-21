<template>
  <n-space>
    <n-card
      title="出行规划"
      :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        width: '20vw',
        margin: '20px',
      }"
    >
      <n-text>总时间：{{ formatTime(totalTime()) }}</n-text>
      <n-timeline :icon-size="20">
        <n-timeline-item
          v-for="(item, index) in plan"
          :title="item.title"
          :time="item.time"
          color="grey"
        >
          <template #icon>
            <n-icon>
              <CashIcon />
            </n-icon>
          </template>
          <n-space :wrap="false">
            <n-auto-complete
              v-model:value="item.address"
              :options="options"
              placeholder="地点"
              clearable
              @update:value="handleUpdateValue"
            />
            <n-select
              v-model:value="item.way"
              placeholder="方式"
              :options="goWays"
            />
          </n-space>
          <n-space>
            <n-text>{{ `距离：${item.wayLength / 1000}千米` }}</n-text>
            <n-text>{{ `时间：${item.wayTime}` }}</n-text>
            <n-button @click="addNode" v-show="index === plan.length - 1"
              >下一站</n-button
            >
            <n-button @click="pathPlan(index)" v-show="index < plan.length - 1"
              >路线规划</n-button
            >
          </n-space>
        </n-timeline-item>
      </n-timeline>
    </n-card>
    <n-card
      title="路线规划"
      :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        width: '20vw',
        margin: '20px',
      }"
    >
      <div id="my-panel" style="max-height: 80vh; overflow: auto"></div>
    </n-card>
    <n-card
      title="路线规划"
      :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        width: '50vw',
        margin: '20px',
      }"
    >
      <Map />
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
import Map from "../map/index.vue";
const color = useThemeVars();
// 输入提示的数据
const options = ref<any>([]);
// 出行方式
const goWays = ref([
  { label: "自驾", value: "driving" },
  { label: "公交地铁", value: "transfer" },
  { label: "步行", value: "walking" },
  { label: "骑行", value: "riding" },
]);

const handleUpdateValue = (value: string) => {
  console.log(value);
  //根据关键字进行搜索 keyword 为搜索的关键词
  window.autoComplete.search(value, function (status: string, result: any) {
    //搜索成功时，result 即是对应的匹配数据
    console.log(status, result);
    if (status === "error") return;
    options.value = result.tips.map((item: any) => {
      return {
        value: item.name,
        label: item.name,
      };
    });
  });
};
const pathPlan = (index: number) => {
  console.log(
    "路线规划",
    plan.value[index].address,
    plan.value[index + 1].address,
    plan.value[index].way
  );
  const way = plan.value[index].way;
  (window as any)[way].search(
    [
      { keyword: plan.value[index].address },
      { keyword: plan.value[index + 1].address },
    ],
    function (status: any, result: any) {
      if (status === "error") return;
      console.log(status, result);
      if (way === "transfer") {
        plan.value[index].wayLength = result.plans[0].distance;
        plan.value[index].wayTime = formatTime(result.plans[0].time);
        plan.value[index].waySeconds = result.plans[0].time;
      } else {
        plan.value[index].wayLength = result.routes[0].distance;
        plan.value[index].wayTime = formatTime(result.routes[0].time);
        plan.value[index].waySeconds = result.routes[0].time;
      }
    }
  );
};
const plan = ref([
  {
    title: "出发",
    address: "北京",
    time: "2021-10-01 08:00",
    way: "transfer",
    wayLength: 0,
    wayTime: "0分钟",
    waySeconds: 0,
  },
]);

const addNode = () => {
  plan.value.push({
    title: "下一站",
    address: "",
    time: "2021-10-02 08:00",
    way: "transfer",
    wayLength: 0,
    wayTime: "0分钟",
    waySeconds: 0,
  });
};

const formatTime = (second: number) => {
  const d = Math.floor(second / 86400);
  const h = Math.floor(second / 3600);
  const m = Math.floor((second % 3600) / 60);
  const s = Math.floor(second % 60);
  if (d === 0) return `${h}小时${m}分钟${s}秒`;
  if (h === 0) return `${m}分钟${s}秒`;
  if (m === 0) return `${s}秒`;
  return `${d}天${h}小时${m}分钟${s}秒`;
};

const totalTime = () => {
  return plan.value.reduce((pre, cur) => pre + cur.waySeconds, 0);
};
</script>

<style scoped>
.amap-lib-transfer{
  background-color: transparent;
}
.planTitle{
  background: transparent;
}
</style>
