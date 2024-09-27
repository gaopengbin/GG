<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="address"
        name="地点"
        label="地点"
        placeholder="地点"
        :rules="[{ required: true, message: '请填写地点' }]"
        id="myaddress"
      >
      </van-field>
      <van-field name="checkboxGroup" label="参与人">
        <template #input>
          <n-select
            v-model:value="person"
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
      <!-- <van-field
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
      </van-field> -->
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        开始计算
      </van-button>
    </div>
    <Map style="height: 60vh; width: 100vw; margin: 0vw; border-radius: 10px" />
  </van-form>
  <van-floating-panel
    :content-draggable="false"
    :anchors="anchors"
    v-model:height="height"
  >
    <!-- <div
      id="my-panel"
      :style="{ maxHeight: height - 80 + 'px', overflow: 'auto' }"
    ></div> -->
    <van-list :style="{ maxHeight: height - 80 + 'px', overflow: 'auto' }">
      <van-cell v-for="item in pathResults" :key="item">
        <div class="poibox">
          <div class="poi-pic">
            <img :src="item.photos[0]?.url" alt="" />
          </div>
          <n-text>{{ item.name }}</n-text>
          <div class="poi-info">{{ item.address }}</div>
          <div class="poi-info" v-for="p in item.extension">
            <n-tag>{{
              `${p.name}:${p.wayTime}|${p.cost}元|打车:${p.taxi_cost}元`
            }}</n-tag>
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-floating-panel>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { nextTick, ref } from "vue";
import { personAPI } from "@/api/person";
import Map from "../map/index.vue";
const router = useRouter();
const AMap = window.AMap;
const jump = () => {
  router.push("/addPerson");
};
const address = ref("");
let marker: any = null;
nextTick(() => {
  AMap.plugin("AMap.Autocomplete", function () {
    var autoOptions = {
      city: "全国",
      input: "myaddress",
    };
    var autocomplete = new AMap.Autocomplete(autoOptions);

    AMap.Event.addListener(autocomplete, "select", function (e: any) {
      if (marker) {
        window.map.remove(marker);
      }
      address.value = e.poi.name;
      marker = new AMap.Marker({
        position: e.poi.location,
        title: e.poi.name,
      });
      window.map.add(marker);
      window.map.setCenter(e.poi.location);
      window.map.setZoom(17);
      // person.value.position = [e.poi.location.lng, e.poi.location.lat];
    });
  });
});
const person = ref([]);
const options = ref([]);
const anchors = [
  100,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.9 * window.innerHeight),
];
const height = ref(anchors[0]);
personAPI.getPerson().then((res) => {
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
  console.log(person.value, type.value, address.value);
  if (address.value) {
    computePath();
  } else {
    computePOI();
  }
};
const way = ref("transfer");
const pathResults = ref<any>([]);
// if(window.transfer)
const computePath = () => {
  (window as any)[way.value].opt.map = null;
  (window as any)[way.value].opt.panel = "";

  AMap.plugin("AMap.PlaceSearch", function () {
    var placeSearch = new AMap.PlaceSearch({
      //city 指定搜索所在城市，支持传入格式有：城市名、citycode 和 adcode
      city: "全国",
      extensions: "all",
    });
    placeSearch.search(address.value, function (status: any, result: any) {
      //查询成功时，result 即对应匹配的 POI 信息
      if (status === "complete" && result.info === "OK") {
        let markers: any = [];
        result.poiList.pois.forEach((item: any) => {
          item.extension = [];
          const marker = new AMap.Marker({
            position: item.location,
            title: item.name,
          });
          markers.push(marker);
          window.map.add(marker);
          person.value.forEach((p: any) => {
            const positionA = p.position.split(",");
            const positionB = item.location.toArray();
            (window as any)[way.value].search(
              positionA,
              positionB,
              function (status: any, result: any) {
                if (status === "error") return;
                if (status === "complete") {
                  if (way.value === "transfer") {
                    item.extension.push({
                      name: p.name,
                      wayLength: result.plans[0].distance,
                      wayTime: formatTime(result.plans[0].time),
                      cost: result.plans[0].cost,
                      taxi_cost: result.taxi_cost,
                    });
                  } else {
                    item.extension.push({
                      name: p.name,
                      wayLength: result.routes[0].distance,
                      wayTime: formatTime(result.routes[0].time),
                    });
                  }
                }
              }
            );
          });
        });
        window.map.setFitView(markers);
        pathResults.value = result.poiList.pois;
      }
    });
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

const computePOI = () => {
  //   计算一个合适的中心点，然后搜索周边的POI
  let positions = person.value.map((item: any) => {
    let position = item.position.split(",");
    return [Number(position[0]), Number(position[1])];
  });

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
        window.map.getAllOverlays().forEach((item: any) => {
          if (item.CLASS_NAME === "AMap.Marker") {
            // 监听点击事件
            item.on("click", function (e: any) {
              console.log(e.target);
              // window.map.clearInfoWindow();
              // var infoWindow = new AMap.InfoWindow({
              //   content: e.target.content,
              //   offset: new AMap.Pixel(0, -30),
              // });
              // infoWindow.open(window.map, e.target.getPosition());
            });
          }
        });
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
.poibox {
  text-align: left;
}
.poi-pic {
  width: 100px;
  height: 100px;
  float: left;
  margin: 4px;
}
.poi-pic img {
  width: 100%;
  height: 100%;
}
</style>
