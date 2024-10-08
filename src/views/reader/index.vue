<template>
  <div>
    <n-upload @change="handleChange"><n-button>上传文件</n-button></n-upload>
    <n-button @click="read">read</n-button>
    <Read :url="url" />
  </div>
</template>

<script setup lang="ts">
import { UploadFileInfo } from "naive-ui";
import Read from "./read.vue";
import { ref } from "vue";
const url = ref<any>(null);
const handleChange = async (options: { fileList: UploadFileInfo[] }) => {
  console.log(options);
  url.value = null;
  url.value = await options.fileList[0].file?.arrayBuffer();
  console.log(url.value);
};
const read = () => {
  console.log("read");
};
</script>

<style scoped></style>
