<template>
  <img src="@img/logo.png" class="logo" alt="" srcset="">
</template>

<script setup>
import { ref } from 'vue';
const { ipcRenderer } = require('electron');

// const msg = ref({});
// ipcRenderer.on('emitMsg', (event, data) => {
//   msg.value = data;
//   console.log('test', msg);
// });
// const today = ref(new Date().toLocaleString().split(' ')[0]);
</script>

<style lang="scss" scoped>
.logo {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  cursor: pointer;
}
</style>