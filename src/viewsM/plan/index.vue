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
              maxHeight: height - 80 + 'px',
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
                :title="item.title"
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
                  />
                  <n-space>
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
                    >路线计算</n-button
                  >
                </n-flex>
              </n-timeline-item>
            </n-timeline>
            <n-flex vertical>
              <n-button type="info" @click="addNode">添加目的地</n-button>
              <n-button type="success" @click="showModal = true"
                >规划完毕</n-button
              >
            </n-flex>
          </n-card>
        </van-tab>
        <van-tab title="路线">
          <div id="my-panel" style="max-height: 50vh; overflow: auto"></div>
        </van-tab>
      </van-tabs>
    </van-floating-panel>
  </n-card>

  <n-modal :show="showModal">
    <n-card
      style="width: 600px"
      title="保存计划"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item label="标题" path="inputValue">
          <n-input v-model:value="model.title" placeholder="请输入标题" />
        </n-form-item>
        <n-form-item label="描述" path="textareaValue">
          <n-input
            v-model:value="model.description"
            placeholder="请输入描述信息"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
        <n-space justify="center">
          <n-button type="primary" @click="showModal = false"> 取消 </n-button>
          <n-button type="success" @click="addPlan"> 保存 </n-button>
        </n-space>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { Car, Bicycle, Walk, Bus } from "@vicons/ionicons5";
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
import Map from "../map/index.vue";
import { planAPI } from "@/api/plan";
const showModal = ref(false);
const model = ref({
  title: "",
  cover: "https://api.asxe.vip/scenery.php",
  description: "",
});
const rules = ref({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  description: [{ required: true, message: "请输入描述", trigger: "blur" }],
});
const activeTab = ref("地图");
const active = ref(0);
const anchors = [
  100,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.9 * window.innerHeight),
];
const height = ref(anchors[0]);
const color = useThemeVars();
// 输入提示的数据
const options = ref<any>([]);
// 出行方式
const goWays = ref([
  { label: "打车/自驾", value: "driving" },
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
      plan.value[index + 1].time = new Date(
        plan.value[index].time + plan.value[index].waySeconds * 1000
      ).getTime();
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

// const getPlan = () => {
//   const planStr = localStorage.getItem("plan");
//   if (planStr) {
//     plan.value = JSON.parse(planStr);
//   }
// };

// getPlan();

const addPlan = () => {
  console.log(plan.value);
  const planData = {
    title: model.value.title,
    cover: model.value.cover,
    description: model.value.description,
    content: JSON.stringify(plan.value),
  };
  planAPI.addPlan(planData).then((res: any) => {
    console.log(res);
    if (res.status === 200) {
      showModal.value = false;
    }
  });
  // localStorage.setItem("plan", JSON.stringify(plan.value));
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
.amap-content-body,.amap-lib-infowindow{
  background-color: var(--van-floating-panel-background) !important;
}
</style>
