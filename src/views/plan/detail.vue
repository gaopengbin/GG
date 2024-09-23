<template>
  <n-flex vertical>
    <n-card
      title="出行规划"
      :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        margin: '10px',
        maxHeight: '90vh',
        overflow: 'auto',
        width: 'auto',
      }"
    >
      <n-tag>总时间：{{ formatTime(totalTime()) }}</n-tag>
      <n-timeline :icon-size="20">
        <n-timeline-item
          v-for="(item, index) in plan"
          :title="item.title"
          :time="new Date(item.time).toLocaleString()"
          color="grey"
        >
          <template #icon>
            <n-icon>
              <Bicycle v-if="item.way == 'riding'" />
              <Bus v-if="item.way == 'transfer'" />
              <Walk v-if="item.way == 'walking'" />
              <Car v-if="item.way == 'driving'" />
            </n-icon>
          </template>
          <n-flex vertical>
            <n-date-picker
              v-model:value="item.time"
              value-format="yyyy/M/d HH:mm:ss"
              type="datetime"
              :disabled="true"
            />
            <n-tag>{{ item.address }}</n-tag>
            <n-select
              v-model:value="item.way"
              placeholder="方式"
              :options="goWays"
              v-show="index < plan.length - 1"
            />
            <n-tag v-show="index < plan.length - 1">
              {{ `距离：${item.wayLength / 1000}千米` }}
            </n-tag>
            <n-tag v-show="index < plan.length - 1">
              {{ `时间：${item.wayTime}` }}</n-tag
            >
            <n-button
              type="info"
              @click="pathPlan(index)"
              v-show="index < plan.length - 1"
              >路线查看</n-button
            >
          </n-flex>
        </n-timeline-item>
      </n-timeline>
    </n-card>
    <n-card
      title="路线规划"
      :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        margin: '10px',
        width: 'auto',
      }"
    >
      <div id="my-panel" style="max-height: 80vh; overflow: auto"></div>
    </n-card>
    <n-card
      title="路线规划"
      :style="{
        backgroundColor: color.cardColor,
        textAlign: 'left',
        margin: '10px',
        width: 'auto',
      }"
    >
      <Map />
    </n-card>
  </n-flex>
</template>

<script setup lang="ts">
import { usePlansStore } from "../../store";
const planStore = usePlansStore();

console.log(planStore.getCurrentPlan);
import { Car, Bicycle, Walk, Bus } from "@vicons/ionicons5";
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
import Map from "../map/index.vue";
const color = useThemeVars();
// 出行方式
const goWays = ref([
  { label: "自驾/打车", value: "driving" },
  { label: "公交地铁", value: "transfer" },
  { label: "步行", value: "walking" },
  { label: "骑行", value: "riding" },
]);

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
    }
  );
};
const plan = planStore.getCurrentPlan?.content;

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
  return plan.value.reduce((pre: any, cur: any) => pre + cur.waySeconds, 0);
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
