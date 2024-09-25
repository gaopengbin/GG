<template>
  <n-carousel draggable autoplay style="width: auto; height: 200px;border-radius: 5px;">
    <img class="carousel-img" v-for="item in photoList" :src="item.src" />
  </n-carousel>
</template>

<script setup lang="ts">
// import axios from "axios";
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
const themeVars = useThemeVars();
const photoList = ref<any>([]);
const getRandomPhoto = async (i: number) => {
  // const res = await axios.get(
  //   "https://api.btstu.cn/sjbz/api.php?lx=suiji&format=json"
  // );
  // photoList.value.push({ src: res.data.imgurl });
  photoList.value.push({
    src: "https://api.asxe.vip/scenery.php?index=" + i,
  });
};
const fetchPhoto = () => {
  photoList.value = [];
  for (let i = 0; i < 9; i++) {
    getRandomPhoto(i);
  }
};
fetchPhoto();
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-item {
  width: 100px;
  height: 80px;
  object-fit: cover;
}
</style>
