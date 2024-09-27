<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="person.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="person.address"
        name="地址"
        label="地址"
        placeholder="地址"
        :rules="[{ required: true, message: '请填写地址' }]"
        id="myaddress"
      >
        <template #button>
          <van-button size="small" type="primary" @click="location"
            >定位</van-button
          >
        </template>
      </van-field>
      <van-field name="checkboxGroup" label="喜好">
        <template #input>
          <van-checkbox-group v-model="person.hobby" direction="horizontal">
            <van-space wrap>
              <van-checkbox
                :name="item"
                shape="square"
                v-for="item in hobbies"
                >{{ item }}</van-checkbox
              >
            </van-space>
          </van-checkbox-group>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
    <div style="margin: 16px">
      <van-button round block type="primary" @click="router.back">
        取消
      </van-button>
    </div>
    <Map style="height: 80vw; width: 90vw; margin: 5vw" />
  </van-form>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { usePlansStore } from "@/store";
import Map from "../map/index.vue";
import { personAPI } from "@/api/person";
import { useRouter } from "vue-router";
import { showToast } from "vant";
const router = useRouter();
const store = usePlansStore();
const person = ref<any>({
  name: "",
  address: "",
  position: [],
  hobby: [],
});
const hobbies = ref<any>([
  "公园广场",
  "风景名胜",
  "娱乐场所",
  "影剧院",
  "超级市场",
  "中餐厅",
]);
const AMap = window.AMap;
nextTick(() => {
  AMap.plugin("AMap.Autocomplete", function () {
    var autoOptions = {
      city: "全国",
      input: "myaddress",
    };
    var autocomplete = new AMap.Autocomplete(autoOptions);
    console.log(autocomplete);

    AMap.Event.addListener(autocomplete, "select", function (e: any) {
      console.log(e);
      person.value.address = e.poi.name;
      const marker = new AMap.Marker({
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

const location = () => {
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
    person.value.address = data.formattedAddress;
    const marker = new AMap.Marker({
      position: data.position,
    });
    window.map.add(marker);
    window.map.setCenter(data.position);
    window.map.setZoom(17);
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
          person.value.address = result.city;
        }
      });
    });
  }
};

const onSubmit = () => {
  AMap.plugin("AMap.Geocoder", function () {
    var geocoder = new AMap.Geocoder({
      city: "全国", // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    });

    var address = person.value.address;

    geocoder.getLocation(address, function (status: any, result: any) {
      if (status === "complete" && result.info === "OK") {
        // result中对应详细地理坐标信息
        console.log(result);
        if (result.info === "OK") {
          person.value.position = [
            result.geocodes[0].location.lng,
            result.geocodes[0].location.lat,
          ];
          console.log(person.value);
          personAPI.addPerson(person.value).then((res) => {
            console.log(res);
            if (res.data === "添加成功") {
              showToast("添加成功");
              router.back();
            }
            // store.addPerson(person.value);
          });
          //   store.addPerson(person.value);
        } else {
          alert("地址解析失败");
        }
      }
    });
  });
};
</script>

<style scoped></style>
