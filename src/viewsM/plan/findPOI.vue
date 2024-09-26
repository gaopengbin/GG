<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field name="checkboxGroup" label="参与人">
        <template #input>
          <n-select
            v-model:value="value"
            multiple
            :options="options"
            placeholder="选择参与人员"
          >
            <template #header>
              <van-button type="primary" @click="jump" size="small" block
                >添加人员</van-button
              >
            </template>
          </n-select>
        </template>
      </van-field>
      <van-field
        v-model="type"
        is-link
        readonly
        name="picker"
        label="类型"
        placeholder="点击选择类型"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field name="slider" label="距离">
        <template #input>
          <van-slider v-model="distance" :min="1" :max="100" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        开始计算
      </van-button>
    </div>
    <Map style="height: 80vw; width: 90vw; margin: 5vw" />
  </van-form>
  <van-floating-panel
    :content-draggable="false"
    :anchors="anchors"
    v-model:height="height"
  >
    <div
      id="my-panel"
      :style="{ maxHeight: height - 80 + 'px', overflow: 'auto' }"
    ></div>
  </van-floating-panel>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePlansStore } from "@/store";
import { ref } from "vue";
import { personAPI } from "@/api/person";
import Map from "../map/index.vue";
const store = usePlansStore();
const router = useRouter();
console.log(store.location);
const jump = () => {
  console.log("jump");
  router.push("/addPerson");
};
const value = ref([]);
const options = ref([]);
const anchors = [
  100,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.9 * window.innerHeight),
];
const height = ref(anchors[0]);
personAPI.getPerson().then((res) => {
  console.log(res);
  options.value = res.data.map((item: any) => {
    return {
      value: item,
      label: item.name,
    };
  });
});

const type = ref("");
const distance = ref(10);
const showPicker = ref(false);
const columns = [
  { text: "中餐厅", value: "中餐厅" },
  { text: "商场", value: "商场" },
  { text: "超级市场", value: "超级市场" },
  { text: "KTV", value: "KTV" },
  { text: "电影院", value: "电影院" },
  { text: "公园广场", value: "公园广场" },
  { text: "风景名胜", value: "风景名胜" },
];

const onConfirm = ({ selectedOptions }: any) => {
  type.value = selectedOptions[0]?.text;
  showPicker.value = false;
};

let line: any = null;

const onSubmit = () => {
  window.map.clearMap();
  const AMap = window.AMap;
  console.log(value.value, type.value);

  //   计算一个合适的中心点，然后搜索周边的POI
  let positions = value.value.map((item: any) => {
    let position = item.position.split(",");
    return [Number(position[0]), Number(position[1])];
  });
  console.log(positions);

  let cpoint = positions[0]; //中心点坐标
  let path: any = [];
  if (positions.length == 2) {
    cpoint = [
      (positions[0][0] + positions[1][0]) / 2,
      (positions[0][1] + positions[1][1]) / 2,
    ];
    path = [
      new AMap.LngLat(positions[0][0], positions[0][1]),
      new AMap.LngLat(positions[1][0], positions[1][1]),
    ];

    line = new AMap.Polyline({
      path: path, //设置折线的节点数组
      strokeColor: "#3366FF", //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 5, //线宽
      strokeStyle: "dashed", //线样式
    }); //创建折线
    window.map.add(line);
  }

  AMap.plugin("AMap.PlaceSearch", function () {
    var placeSearch = new AMap.PlaceSearch({
      //city 指定搜索所在城市，支持传入格式有：城市名、citycode 和 adcode
      city: "全国",
      map: window.map,
      autoFitView: true,
      pageSize: 999,
      panel: "my-panel",
    });
    // var cpoint = positions[0]; //中心点坐标
    placeSearch.searchNearBy(
      type.value,
      cpoint,
      distance.value * 1000,
      function (status: any, result: any) {
        //查询成功时，result 即对应匹配的 POI 信息
        console.log(status, result);
      }
    );
  });
};
</script>

<style>
.amap-content-body,
.amap-lib-infowindow {
  background-color: var(--van-floating-panel-background) !important;
}
</style>
