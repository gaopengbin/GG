<template>
  <div class="something-box">
    <n-space vertical>
      <n-card
        hoverable
        :style="{ backgroundColor: color.cardColor, textAlign: 'left' }"
        title="关于我"
      >
        <n-avatar size="large" round style="margin: 0 0 15px 0" :src="Logo" />
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
      <n-card
        hoverable
        :style="{ backgroundColor: color.cardColor, textAlign: 'left' }"
        title="生活轨迹"
      >
        <n-timeline>
          <n-timeline-item
            v-for="item in timeline"
            :type="item.type"
            :title="item.title"
            :content="item.content"
            :time="item.time"
            line-type="dashed"
          />
        </n-timeline>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from "naive-ui";
import { ref } from "vue";
import Logo from "@/assets/avatar/logo.png";
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
    value: "我是个平凡的人，只是喜欢做一些自己喜欢的事，仅此而已🤪🤪🤪",
  },
]);
const timeline = ref<any>([
  {
    type: "success",
    title: "刘聪 回到2000 演唱会",
    content: "这天我们一起去看了刘聪的演唱会",
    time: "2024-08-17 19:00",
  },
  {
    type: "success",
    title: "中秋节",
    content: "我们一起过中秋节",
    time: "2024-09-17 12:00",
  },
  {
    type: "warning",
    title: "杨和苏演唱会",
    content: "这天我们一起去看杨和苏的演唱会",
    time: "2024-09-28 19:00",
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
