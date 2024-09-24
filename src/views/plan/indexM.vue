<template>
  <n-tabs type="line" animated justify-content="space-evenly" ref="tabsRef" v-model:value="activeTab">
    <n-tab-pane name="地图" tab="地图" display-directive="show">
      <n-card :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        margin: '0px',
        width: 'auto',
        height: '90vh',
      }" :content-style="{
          padding: '0px',
        }">
        <Map style="height: 40vh" />
        <div id="my-panel" style="max-height: 50vh; overflow: auto"></div>
      </n-card>
    </n-tab-pane>
    <n-tab-pane name="规划" tab="规划" display-directive="show">
      <n-card title="出行规划" :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        margin: '10px',
        maxHeight: '90vh',
        overflow: 'auto',
        width: 'auto',
      }">
        <n-tag>总时间：{{ formatTime(totalTime()) }}</n-tag>
        <n-timeline :icon-size="20">
          <n-timeline-item v-for="(item, index) in plan" :title="item.title"
            :time="new Date(item.time).toLocaleString()" color="grey">
            <template #icon>
              <n-icon>
                <Bicycle v-if="item.way == 'riding'" />
                <Bus v-if="item.way == 'transfer'" />
                <Walk v-if="item.way == 'walking'" />
                <Car v-if="item.way == 'driving'" />
              </n-icon>
            </template>
            <n-flex vertical>
              <n-date-picker v-model:value="item.time" value-format="yyyy/M/d HH:mm:ss" type="datetime" />
              <n-auto-complete v-model:value="item.address" :options="options" placeholder="地点" clearable
                @update:value="handleUpdateValue" />
              <n-select v-model:value="item.way" placeholder="方式" :options="goWays" v-show="index < plan.length - 1" />
              <n-tag v-show="index < plan.length - 1">
                {{ `距离：${item.wayLength / 1000}千米` }}
              </n-tag>
              <n-tag v-show="index < plan.length - 1">
                {{ `时间：${item.wayTime}` }}</n-tag>
              <n-button type="info" @click="pathPlan(index)" v-show="index < plan.length - 1">路线规划</n-button>
            </n-flex>
          </n-timeline-item>
        </n-timeline>
        <n-flex vertical>
          <n-button type="info" @click="addNode">添加目的地</n-button>
          <n-button type="success" @click="finish">规划完毕</n-button>
        </n-flex>
      </n-card>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { Car, Bicycle, Walk, Bus } from "@vicons/ionicons5";
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
import Map from "../map/index.vue";
const activeTab = ref("地图");
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
      activeTab.value = "地图";
    }
  );
};
const plan = ref([
  {
    title: "出发",
    address: "北京",
    // time: '2024/09/23 14:46:44',
    time: new Date().getTime(),
    way: "transfer",
    wayLength: 0,
    wayTime: "0分钟",
    waySeconds: 0,
  },
]);
console.log(plan.value[0].time);
const addNode = () => {
  plan.value.push({
    title: "下一站",
    address: "",
    time: new Date().getTime(),
    // time: "2021-10-02 08:00",
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

const getPlan = () => {
  const planStr = localStorage.getItem("plan");
  if (planStr) {
    plan.value = JSON.parse(planStr);
  }
};

// getPlan();

const finish = () => {
  console.log(plan.value);
  localStorage.setItem("plan", JSON.stringify(plan.value));
};
</script>

<style>
#my-panel {
  color: #565656;
}

.amap-lib-transfer {
  background-color: transparent !important;
}

.planTitle {
  background: transparent !important;
}

.planTitle:hover {
  background: transparent !important;
}
</style>
