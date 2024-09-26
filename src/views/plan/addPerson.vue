<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="person.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="person.address"
        name="地址"
        label="地址"
        placeholder="地址"
        :rules="[{ required: true, message: '请填写地址' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const person = ref({
  name: "",
  address: "",
  position: [],
  hobby: [],
});

const onSubmit = () => {
  console.log(person.value);
};
</script>

<style scoped></style>
