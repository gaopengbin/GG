<template>
  <n-list>
    <n-collapse :accordion="true">
      <n-list-item v-for="(toc, index) in tocs">
        <n-button
          v-if="!toc.subitems || toc.subitems.length === 0"
          style="width: 100%"
          @click="locate(toc)"
          >{{ toc.label }}</n-button
        >
        <n-collapse-item
          :title="toc.label"
          v-if="toc.subitems && toc.subitems.length > 0"
        >
          <template #header>
            <n-text>
              {{ toc.label }}
            </n-text>
          </template>
          <n-list>
            <n-list-item
              v-for="(subitem, subindex) in toc.subitems"
              :key="subindex"
            >
              <n-button
                style="width: 100%"
                @click="locate(subitem)"
                :type="
                  subitem.href.indexOf(currentToc.href) > -1
                    ? 'success'
                    : 'default'
                "
                >{{ subitem.label }}</n-button
              >
            </n-list-item>
          </n-list>
        </n-collapse-item>
      </n-list-item>
    </n-collapse>
  </n-list>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/store";
import { ref } from "vue";
const store = useGlobalStore();
const tocs = ref<any>([]);
const currentToc = ref<any>();
const getContents = () => {
  store.currentBook.loaded.navigation.then((toc: any) => {
    tocs.value = toc.toc;
  });
};
getContents();
const locate = (toc: any) => {
  currentToc.value = toc;
  store.currentBook.rendition.display(toc.href);
};

const findParent = (tocs: any, href: string) => {
  for (let i = 0; i < tocs.length; i++) {
    if (tocs[i].subitems && tocs[i].subitems.length > 0) {
      const parent: any = findParent(tocs[i].subitems, href);
      if (parent) {
        return parent;
      }
    } else {
      if (tocs[i].href.split("#")[0] === href) {
        return tocs[i];
      }
    }
  }
  return null;
};

const setname = (toc: any) => {
  return toc.href.split("#")[0];
};
</script>

<style scoped></style>
