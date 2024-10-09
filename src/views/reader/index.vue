<template>
  <div style="padding: 20px">
    <n-upload @change="handleChange" :show-file-list="false"
      ><n-button type="primary">上传书籍（仅限EPUB格式）</n-button></n-upload
    >
    <n-space style="margin-top: 10px">
      <n-card
        hoverable
        v-for="item in books"
        @click="read(item.id)"
        :header-style="{ width: '200px', height: '40px', padding: '5px' }"
      >
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
  </div>
</template>

<script setup lang="ts">
import { UploadFileInfo } from "naive-ui";
// import Read from "./read.vue";
import { ref } from "vue";
import { bookAPI } from "@/api/book";
import { useRouter } from "vue-router";
const router = useRouter();
// const url = ref<any>(null);
const handleChange = async (options: {
  fileList: UploadFileInfo[];
  file: UploadFileInfo;
}) => {
  console.log(options);
  const file: any = options.file.file;
  const formdata = new FormData();
  formdata.append("content", file);
  formdata.append("title", options.file.name);
  formdata.append("url", "");
  const book = window.ePub({
    bookPath: await file.arrayBuffer(),
    restore: false,
  });
  console.log(file, book);
  // book.coverUrl().then((res) => {
  //   console.log(res);
  // });
  getCoverURL(book, (res: any) => {
    console.log(res);
    formdata.append("cover", res);
    bookAPI.addBook(formdata).then((res) => {
      console.log(res);
      if (res.status === 200) {
        getBook();
      }
    });
  });
};
const read = (id: string) => {
  console.log("read");
  // url.value = null;
  // url.value = "/api" + id + ".epub";
  router.push({ path: "/book/" + id });
};
const books = ref<any>([]);
const getBook = () => {
  bookAPI.getBook().then((res) => {
    console.log(res);
    books.value = res.data;
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
</script>

<style scoped></style>
