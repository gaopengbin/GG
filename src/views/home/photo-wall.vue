<template>
  <div style="width: 80vw">
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-carousel draggable autoplay style="width: 40vw; height: 280px">
          <img class="carousel-img" v-for="item in photoList" :src="item.src" />
        </n-carousel>
      </n-gi>
      <n-gi>
        <n-image-group>
          <n-space :size="2">
            <n-image
              v-for="item in photoList"
              width="100"
              height="60"
              :src="item.src"
            />
          </n-space>
        </n-image-group>
      </n-gi>
    </n-grid>
    <div
      :style="{
        backgroundColor: themeVars.cardColor,
        fontSize: '20px',
        padding: '10px',
      }"
    >
      生活的美好需要被记录📷<n-button text @click="fetchPhoto">换一批</n-button>
    </div>
  </div>
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
  for (let i = 0; i < 20; i++) {
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
