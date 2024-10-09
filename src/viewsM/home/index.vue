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
      <n-card>
        <n-text>
          <span>📍{{ address }} 今后四天</span>
          <span v-for="item in weatherInfo.forecasts">
            | {{ item.dayWeather }}
          </span>
          <span>{{ weatherInfo.weather }}</span>
        </n-text>
      </n-card>
      <div style="max-height: 800px; margin: 1vh 0">
        <photoWall />
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
import photoWall from "./photo-wall.vue";
import arcticleList from "./arcticle-list.vue";
import something from "./something.vue";
import { ref } from "vue";
import { Bicycle, BookOutline, CashOutline as CashIcon } from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import AMapLoader from "@amap/amap-jsapi-loader";
import { usePlansStore } from "@/store";
const store = usePlansStore();
const router = useRouter();

const btns = ref([
  {
    title: "出行",
    icon: Bicycle,
    path: "/plan",
  },
  {
    title: "去哪",
    icon: CashIcon,
    path: "/findPOI",
  },
  {
    title: "阅读",
    icon: BookOutline,
    path: "/reader",
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
  if (btn.path) {
    router.push(btn.path);
  } else {
    alert("敬请期待！");
  }
};
const address = ref("");
const weatherInfo = ref<any>({});
window._AMapSecurityConfig = {
  securityJsCode: "649d0df720c956d7cafdc550a59dfbe0",
};
AMapLoader.load({
  key: "9ad9fa28a46a93b65425f18776b16fb9", // 申请好的Web端开发者Key，首次调用 load 时必填
  version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [
    "AMap.AutoComplete",
    "AMap.Driving",
    "AMap.Transfer",
    "AMap.Walking",
    "AMap.Riding",
    "AMap.Weather",
    "AMap.Geolocation",
  ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
}).then((AMap) => {
  window.weather = new AMap.Weather();
  if (store.location) {
    if (store.location.addressComponent) {
      address.value =
        store.location.addressComponent.district +
        store.location.addressComponent.township;
    } else {
      address.value = store.location.city;
    }
    weatherInfo.value = store.weatherInfo;
    return;
  }
  const geolocation = new AMap.Geolocation({
    enableHighAccuracy: true, // 是否使用高精度定位，默认：true
    timeout: 10000, // 设置定位超时时间，默认：无穷大
    offset: [10, 20], // 定位按钮的停靠位置的偏移量
    panToLocation: true, //  定位成功后将定位到的位置作为地图中心点，默认：true
    zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    position: "RB", //  定位按钮的排放位置,  RB表示右下
    needAddress: true,
  });

  geolocation.getCurrentPosition(function (status: any, result: any) {
    if (status == "complete") {
      onComplete(result);
    } else {
      onError(result);
    }
  });

  function onComplete(data: any) {
    // data是具体的定位信息
    console.log(data);
    window.address = data.addressComponent;
    store.location = data;
    address.value =
      data.addressComponent.district + data.addressComponent.township;
    window.weather.getForecast(
      data.addressComponent.adcode,
      function (err: any, data: any) {
        if (!err) {
          console.log(data);
          window.weatherInfo = data;
          store.weatherInfo = data;
          weatherInfo.value = data;
        }
      }
    );
  }

  function onError(data: any) {
    // 定位出错
    console.log(data);
    // alert("定位失败");
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status: any, result: any) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          // alert(result.city);
          store.location = result;
          address.value = result.city;
          window.weather.getForecast(
            result.city,
            function (err: any, data: any) {
              if (!err) {
                window.weatherInfo = data;
                store.weatherInfo = data;
                weatherInfo.value = data;
              }
            }
          );
        }
      });
    });
  }
});
</script>

<style scoped>
.jitang {
  margin-top: 10px;
  font-size: 16px;
  font-style: italic;
}
</style>
