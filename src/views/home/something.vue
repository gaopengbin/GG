<template>
  <div class="something-box">
    <n-space vertical>
      <n-card hoverable :style="{ backgroundColor: color.cardColor }">
        <div style="font-size: 24px; font-weight: bold">关于我</div>
        <n-avatar
          size="large"
          round
          style="margin: 15px"
          src="/src/assets/avatar/logo.png"
        />
        <n-descriptions
          label-placement="left"
          :column="2"
          :style="{ textAlign: 'left' }"
        >
          <n-descriptions-item v-for="item in userInfo" :label="item.label">
            {{ item.value }}
          </n-descriptions-item>
        </n-descriptions>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
const color = useThemeVars();
const userInfo = ref([
  {
    label: "姓名",
    value: "高鹏彬",
  },
  {
    label: "性别",
    value: "男♂",
  },
  {
    label: "出生年月",
    value: "1998/07/13",
  },
  {
    label: "年龄",
    value: "26",
  },
  {
    label: "职业",
    value: "🌏GIS工程师",
  },
  {
    label: "爱好",
    value: "唱歌、写词、旅游、摄影、美食",
  },
  {
    label: "说点什么",
    value:
      "我是个平凡的人，只是喜欢做一些自己喜欢的事，仅此而已🤪🤪🤪",
  },
]);
</script>

<style scoped>
.something-box {
  margin: 10px;
  padding: 0px;

  /* border: 1px solid #e0e0e081; */
}
</style>
