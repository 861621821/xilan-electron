<template>
  <div class="logo-wrap">
    <img src="@img/logo.png" class="logo" alt="" @click="openPanel">
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { ipcRenderer } = require('electron');

const openPanel = () => {
  ipcRenderer.send('openPanel');
};

// const borderColor = ref('transparent');
// setInterval(() => {
//   borderColor.value === 'transparent' ? (borderColor.value = 'var(--el-color-primary)') : (borderColor.value = 'transparent');
// }, 500);
</script>

<style lang="scss" scoped>
.logo-wrap {
  // border: 3px solid transparent;
  // border-color: v-bind(borderColor);
  height: 70px;
  width: 70px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color 0.2s;
}
.logo {
  cursor: pointer;
  height: 90%;
  width: 90%;
  // -webkit-app-region: drag;
}
</style>