<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <article class="chinese">
    <h1>长恨歌</h1>
  </article>
  <article><h1>长恨歌</h1></article>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
