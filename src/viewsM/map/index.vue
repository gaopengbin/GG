<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader";
let map: any = null;
function initAMap() {
  (window as any)._AMapSecurityConfig = {
    securityJsCode: "649d0df720c956d7cafdc550a59dfbe0",
  };
  AMapLoader.load({
    key: "9ad9fa28a46a93b65425f18776b16fb9", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.Scale",
      "AMap.AutoComplete",
      "AMap.Driving",
      "AMap.Transfer",
      "AMap.Walking",
      "AMap.Riding",
      "AMap.Weather",
      "AMap.Geolocation",
    ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        // center: [116.397428, 39.90923], // 初始化地图中心点位置
        mapStyle: "amap://styles/darkblue", // 设置地图的显示样式
      });
      window.map = map;
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认：true
        timeout: 10000, // 设置定位超时时间，默认：无穷大
        offset: [10, 20], // 定位按钮的停靠位置的偏移量
        panToLocation: true, //  定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        position: "RB", //  定位按钮的排放位置,  RB表示右下
        needAddress: true,
      });

      geolocation.getCurrentPosition(function (status:any, result:any) {
        if (status == "complete") {
          onComplete(result);
        } else {
          onError(result);
        }
      });

      function onComplete(data:any) {
        // data是具体的定位信息
        console.log(data);
        window.address = data.addressComponent;
        map.setCenter([data.position.lng, data.position.lat]);
        window.weather.getLive(data.addressComponent.adcode, function (err:any, data:any) {
          if (!err) {
            console.log(data);
            window.weatherInfo = data;
          }
        });
      }

      function onError(data:any) {
        // 定位出错
        console.log(data);
      }
      window.AMap = AMap;
      var autoOptions = {
        //city 限定城市，默认全国
        city: "全国",
      };
      //实例化AutoComplete
      window.autoComplete = new AMap.AutoComplete(autoOptions);
      window.driving = new AMap.Driving({
        policy: 0, //驾车路线规划策略，0是速度优先的策略
        map: map,
        panel: "my-panel",
      });
      window.transfer = new AMap.Transfer({
        city: "北京",
        map: map,
        panel: "my-panel",
        policy: AMap.TransferPolicy.LEAST_TIME, //乘车策略
      });
      window.walking = new AMap.Walking({
        map: map,
        panel: "my-panel",
      });
      window.riding = new AMap.Riding({
        map: map,
        panel: "my-panel",
      });
      window.weather = new AMap.Weather();
    })
    .catch((e) => {
      console.log(e);
    });
}
initAMap();
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
