<template>
  <n-spin :show="loading">
    <div id="viewer" class="spreads"></div>
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
        <styleSetting v-if="activeMenu === '样式'" :book="book" />
        <contents v-if="activeMenu === '目录'" />
        <!-- <template #footer>
          <n-button>Footer</n-button>
        </template> -->
      </n-drawer-content>
    </n-drawer>
    <template #description> 首次加载较慢，请稍等... </template>
  </n-spin>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { ReorderThree, Settings, Bookmark, Menu } from "@vicons/ionicons5";
import styleSetting from "./styleSetting.vue";
import contents from "./contents.vue";
import { useGlobalStore } from "@/store";
import { bookAPI } from "@/api/book";
import { useRoute } from "vue-router";
const route = useRoute();
const loading = ref(false);
const id: any = route.params.id;
const store = useGlobalStore();
const active = ref(false);
const epub = window.ePub;
// const EPUBJS = window.EPUBJS;
let book: any = ref({});
let rendition: any = ref({});
const loadBook = (option: { url: any; title: string }) => {
  book = epub(option.url, {
    // restore: true,
  });
  store.currentBook = book;
  console.log(book);
  book.ready.then(() => {
    loading.value = false;
  });
  rendition = book.renderTo("viewer", {
    width: "100%",
    height: "90vh",
    // manager: "continuous",
    // flow: "paginated",
    spread: "always",
  });
  console.log(rendition);
  rendition.display();

  rendition.hooks.content.register(function (contents: any) {
    store.currentContent = contents;
    console.log(contents);
    contents.css("font-size", "16px");
    contents.css("font-family", "楷体");
    contents.css("line-height", "24px");
    contents.css("background-color", "#f5f5f5");
    contents.css("padding", "10px");
  });
  rendition.on("layout", function (layout: any) {
    let viewer: any = document.getElementById("viewer");
    if (layout.spread) {
      viewer.classList.remove("single");
    } else {
      viewer.classList.add("single");
    }
  });
};

const lookLocalBook = (book1: any) => {
  book = book1;
  store.currentBook = book;
  console.log(book);
  book.ready.then(() => {
    loading.value = false;
  });
  rendition = book.renderTo("viewer", {
    width: "100%",
    height: "90vh",
    // manager: "continuous",
    // flow: "paginated",
    spread: "always",
  });
  console.log(rendition);
  rendition.display();

  rendition.hooks.content.register(function (contents: any) {
    store.currentContent = contents;
    console.log(contents);
    contents.css("font-size", "16px");
    contents.css("font-family", "楷体");
    contents.css("line-height", "24px");
    contents.css("background-color", "#f5f5f5");
    contents.css("padding", "10px");
  });
  rendition.on("layout", function (layout: any) {
    let viewer: any = document.getElementById("viewer");
    if (layout.spread) {
      viewer.classList.remove("single");
    } else {
      viewer.classList.add("single");
    }
  });
};

const prev = () => {
  rendition.prev();
};

const next = () => {
  rendition.next();
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

const getBook = (id: string) => {
  loading.value = true;
  bookAPI.getBookById(id).then((res) => {
    loadBook({
      url: import.meta.env.VITE_API_URL + res.data.url,
      title: res.data.title,
    });
  });
};

const getLocalBook = () => {
  lookLocalBook(store.localBook);
};

onMounted(() => {
  console.log(id);
  if (id != 0) {
    getBook(id);
  } else {
    getLocalBook();
  }
});
onUnmounted(() => {
  book && book.destroy();
});
watch(
  () => id,
  (id) => {
    if (id) {
      getBook(id);
    } else {
      book && book.destroy();
    }
  }
);
</script>

<style scoped>
@import url(./examples.css);
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
