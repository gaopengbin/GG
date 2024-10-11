<template>
  <div style="padding: 20px">
    <n-spin :show="loading">
      <n-space justify="end">
        <n-upload @change="handleChange" :show-file-list="false">
          <n-button type="primary">上传书籍（仅限EPUB格式）</n-button>
        </n-upload>
        <n-upload @change="handleChangeLocal" :show-file-list="false">
          <n-button type="primary">本地阅读（仅限EPUB格式）</n-button>
        </n-upload>
        <n-form-item label="编辑" label-placement="left">
          <n-switch v-model:value="isEdit" />
        </n-form-item>
      </n-space>

      <n-space style="margin-top: 10px">
        <n-card
          hoverable
          v-for="item in books"
          @click="read(item.id)"
          :header-style="{ width: '200px', height: '40px', padding: '5px' }"
        >
          <template #action v-if="isEdit">
            <n-button type="error" @click="delBook(item.id)">删除</n-button>
          </template>
          <template #header>
            <n-ellipsis style="max-width: 180px">
              {{ item.title }}
            </n-ellipsis>
          </template>
          <template #cover>
            <img :src="item.cover" style="width: 200px; height: 300px" />
          </template>
        </n-card>
      </n-space>
      <!-- <Read :url="url" /> -->
      <template #description> 请稍等... </template>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { UploadFileInfo } from "naive-ui";
// import Read from "./read.vue";
import { ref } from "vue";
import { bookAPI } from "@/api/book";
import { useRouter } from "vue-router";
import { useGlobalStore } from "@/store";
const store = useGlobalStore();
const router = useRouter();
const isEdit = ref(false);
const loading = ref(false);
// const url = ref<any>(null);
const handleChange = async (options: {
  fileList: UploadFileInfo[];
  file: UploadFileInfo;
}) => {
  loading.value = true;
  const file: any = options.file.file;
  const formdata = new FormData();
  formdata.append("content", file);
  formdata.append("title", options.file.name);
  formdata.append("url", "");

  const book = new window.ePub();
  book.open(await file.arrayBuffer(), "binary");
  getCoverURL(book, (res: any) => {
    formdata.append("cover", res);
    bookAPI.addBook(formdata).then((res) => {
      if (res.status === 200) {
        getBook();
      }
    });
  });
};

const handleChangeLocal = async (options: {
  fileList: UploadFileInfo[];
  file: UploadFileInfo;
}) => {
  loading.value = true;
  const file: any = options.file.file;
  const formdata = new FormData();
  formdata.append("content", file);
  formdata.append("title", options.file.name);
  formdata.append("url", "");

  const book = new window.ePub();
  book.open(await file.arrayBuffer(), "binary");

  store.localBook = book;
  loading.value = false;
  router.push({ path: "/book/0" });
};

const read = (id: string) => {
  if (isEdit.value) return;
  router.push({ path: "/book/" + id });
};
const books = ref<any>([]);
const getBook = () => {
  loading.value = true;
  bookAPI.getBook().then((res) => {
    console.log(res);
    books.value = res.data;
    loading.value = false;
  });
};
getBook();
function getCoverURL(book: any, callback: any) {
  book.coverUrl().then(function (blobUrl: any) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function () {
      var recoveredBlob = xhr.response;
      var reader = new FileReader();
      reader.onload = function () {
        callback && callback(reader.result);
      };
      reader.readAsDataURL(recoveredBlob);
    };
    xhr.open("GET", blobUrl);
    xhr.send();
  });
}

const delBook = (id: string) => {
  loading.value = true;
  bookAPI.deleteBook(id).then((res) => {
    console.log(res);
    if (res.status === 200) {
      getBook();
    }
  });
};
</script>

<style scoped></style>
