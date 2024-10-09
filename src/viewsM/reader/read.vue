<template>
  <div id="area"></div>
  <div id="prev" class="arrow" @click="prev" v-show="book">‹</div>
  <div id="next" class="arrow" @click="next" v-show="book">›</div>
  <n-float-button
    position="relative"
    type="primary"
    menu-trigger="hover"
    style="position: absolute; bottom: 5vh; right: 1vw"
  >
    <n-icon>
      <ReorderThree />
    </n-icon>
    <template #menu>
      <n-tooltip trigger="hover" placement="right" v-for="btn in btns">
        <template #trigger>
          <n-button type="primary" @click="btn.onclick">
            <n-icon>
              <component :is="btn.icon" />
            </n-icon>
          </n-button>
        </template>
        {{ btn.text }}
      </n-tooltip>
    </template>
  </n-float-button>
  <n-drawer v-model:show="active" :default-width="502" resizable>
    <n-drawer-content>
      <template #header> {{ activeMenu }} </template>
      <styleSetting v-show="activeMenu === '样式'" :book="book" />
      <!-- <template #footer>
          <n-button>Footer</n-button>
        </template> -->
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { ReorderThree, Settings, Bookmark, Menu } from "@vicons/ionicons5";
import styleSetting from "./styleSetting.vue";
import { useGlobalStore } from "@/store";
import { bookAPI } from "@/api/book";
import { useRoute } from "vue-router";
const route = useRoute();
// const props = defineProps<{
//   url: string;
// }>();
const id: any = route.params.id;
const store = useGlobalStore();
const active = ref(false);
const epub = window.ePub;
// const EPUBJS = window.EPUBJS;
let book: any = ref({});
const loadBook = (option: { url: string; title: string }) => {
  book = epub({
    bookPath: option.url,
  });
  store.currentBook = book;
  console.log(book);
  book
    .renderTo("area", {
      width: 600,
      height: 800,
    })
    .then((r: any) => {
      console.log(r);
      book.setStyle("font-size", "16px");
      book.setStyle("font-family", "楷体");
      book.setStyle("line-height", "24px");
      book.setStyle("background-color", "#f5f5f5");
      book.setStyle("padding", "10px");
    });
};

const prev = () => {
  book.prevPage();
};

const next = () => {
  book.nextPage();
};

const activeMenu = ref("");

const btns = [
  {
    icon: Menu,
    text: "目录",
    onclick: () => {
      activeMenu.value = "目录";
      active.value = true;
    },
  },
  {
    icon: Settings,
    text: "样式",
    onclick: () => {
      activeMenu.value = "样式";
      active.value = true;
    },
  },
  {
    icon: Bookmark,
    text: "书签",
    onclick: () => {
      activeMenu.value = "书签";
      active.value = true;
    },
  },
];

onMounted(() => {
  console.log(id);
  bookAPI.getBookById(id).then((res) => {
    loadBook({
      url: "/api" + res.data.url,
      title: res.data.title,
    });
  });
});
onUnmounted(() => {
  book && book.destroy();
});
watch(
  () => id,
  (id) => {
    if (id) {
      bookAPI.getBookById(id).then((res) => {
        loadBook({
          url: "/api" + res.data.url,
          title: res.data.title,
        });
      });
    } else {
      book && book.destroy();
    }
  }
);
</script>

<style scoped>
#area {
  width: auto;
  height: 90vh;
  padding: 0 50px;
  margin: 10px;
  /* background-color: aliceblue; */
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  cursor: pointer;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
}
#prev {
  left: 20px;
}

#next {
  right: 20px;
}
</style>
