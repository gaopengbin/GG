<template>
  <n-card
    :style="{
      backgroundColor: color.cardColor,
      textAlign: 'left',
      margin: '0px',
      width: 'auto',
      height: '90vh',
    }"
    :content-style="{
      padding: '0px',
    }"
  >
    <Map style="height: 90vh" />
    <van-floating-panel
      :content-draggable="false"
      :anchors="anchors"
      v-model:height="height"
    >
      <van-tabs v-model:active="active" swipeable>
        <van-tab title="规划">
          <n-card
            :style="{
              backgroundColor: color.cardColor,
              textAlign: 'left',
              margin: '10px',

              overflow: 'auto',
              width: 'auto',
            }"
            :content-style="{
              padding: '5px',
            }"
          >
            <n-tag>总时间：{{ formatTime(totalTime()) }}</n-tag>
            <n-timeline :icon-size="20">
              <n-timeline-item
                v-for="(item, index) in plan"
                :title="
                  item.title + '  --  ' + new Date(item.time).toLocaleString()
                "
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
                  <n-space>
                    <n-tag size="medium">{{ item.address }}</n-tag>
                    <n-select
                      size="small"
                      v-model:value="item.way"
                      placeholder="方式"
                      :options="goWays"
                      v-show="index < plan.length - 1"
                      style="width: 26vw"
                    />
                  </n-space>
                  <n-space>
                    <n-tag v-show="index < plan.length - 1">
                      {{ `距离：${item.wayLength / 1000}千米` }}
                    </n-tag>
                    <n-tag v-show="index < plan.length - 1">
                      {{ `时间：${item.wayTime}` }}</n-tag
                    >
                  </n-space>
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
        </van-tab>
        <van-tab title="路线">
          <div
            id="my-panel"
            :style="{ maxHeight: height - 80 + 'px', overflow: 'auto' }"
          ></div>
        </van-tab>
      </van-tabs>
    </van-floating-panel>
  </n-card>
</template>

<script setup lang="ts">
import { usePlansStore } from "../../store";
const planStore = usePlansStore();
import { Car, Bicycle, Walk, Bus } from "@vicons/ionicons5";
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
import Map from "../map/index.vue";
const active = ref(0);
const anchors = [
  100,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.9 * window.innerHeight),
];
const height = ref(anchors[0]);
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
      // activeTab.value = "地图";
      active.value = 1;
    }
  );
};
const plan = ref(planStore.getCurrentPlan?.content);
plan.value[plan.value.length - 1].title = "终点";

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
