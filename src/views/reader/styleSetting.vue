<template>
  <n-form-item label="字体大小">
    <n-slider
      :value="fontSize"
      :max="50"
      :min="10"
      @update:value="setFontsize"
    />
  </n-form-item>
  <n-form-item label="字体">
    <n-select
      v-model:value="fontFamily"
      :options="fontFamilies"
      @update:value="setFontFamily"
    />
  </n-form-item>
  <n-form-item label="行高">
    <n-slider
      :value="lineHeight"
      :max="50"
      :min="10"
      @update:value="setLineHeight"
    />
  </n-form-item>
  <n-form-item label="背景颜色">
    <n-color-picker
      v-model:value="backgroundColor"
      @update-value="setBackgroundColor"
      :swatches="[
        '#FFFFFF',
        'rgb(231,224,198)',
        'rgb(226,203,173)',
        '#EDD1B0',
        '#EDDD6E',
        '#F8FD89',
      ]"
    />
  </n-form-item>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGlobalStore } from "@/store";
const store = useGlobalStore();
const fontSize = ref(14);
const fontFamily = ref("楷体");
const fontFamilies = [
  { label: "楷体", value: "楷体" },
  { label: "宋体", value: "宋体" },
  { label: "黑体", value: "黑体" },
  { label: "微软雅黑", value: "微软雅黑" },
  { label: "Roboto", value: "Roboto" },
];
const lineHeight = ref(24);
const backgroundColor = ref("#f5f5f5");
const setFontsize = (value: number) => {
  fontSize.value = value;
  console.log(content);
  // store.currentBook?.rendition.css("font-size", `${fontSize.value}px`);
  store.currentContent.css("font-size", `${fontSize.value}px`);
};
const setFontFamily = (value: string) => {
  fontFamily.value = value;
  store.currentBook?.rendition.css("font-family", fontFamily.value);
};
const setLineHeight = (value: number) => {
  lineHeight.value = value;
  store.currentBook?.rendition.css("line-height", `${lineHeight.value}px`);
};
const setBackgroundColor = (value: string) => {
  backgroundColor.value = value;
  store.currentBook?.rendition.css("background-color", backgroundColor.value);
};
let content: any;
onMounted(() => {
  // store.currentBook.rendition.hooks.content.register(function (contents: any) {
  //   console.log(contents);
  //   content = contents;
  //   console.log("content", content);
  // contents.css("font-size", `${fontSize.value}px`);
  // contents.css("font-family", fontFamily.value);
  // contents.css("line-height", `${lineHeight.value}px`);
  // contents.css("background-color", backgroundColor.value);
  // });
  // fontSize.value = parseInt(store.currentBook?.settings.styles["font-size"]);
  // fontFamily.value = store.currentBook?.settings.styles["font-family"];
  // lineHeight.value = parseInt(
  //   store.currentBook?.settings.styles["line-height"]
  // );
  // backgroundColor.value =
  //   store.currentBook?.settings.styles["background-color"];
});
</script>

<style scoped></style>
