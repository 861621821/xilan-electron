<template>
  <div class="logo-wrap" @mouseleave="isMini = true">
    <img src="@img/logo.png" class="logo" alt="" @dblclick="openPanel">
    <!-- <div class="desc">武汉市洪山区今晚有雨</div> -->
    <Marquee content="武汉市洪山区今晚有雨，气温18度" :speed="1"></Marquee>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Marquee from '@/components/Marquee.vue';
const { ipcRenderer } = require('electron');
const isMini = ref(true);
const openPanel = () => {
  ipcRenderer.send('openPanel');
};

const shadow = ref('unset');
setInterval(() => {
  // shadow.value === 'unset' ? (shadow.value = '0 0 8px 0 var(--el-color-primary)') : (shadow.value = 'unset');
}, 500);
</script>

<style lang="scss" scoped>
.logo-wrap {
  height: 100px;
  width: 100px;
  position: relative;
  color: var(--el-color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}
.logo {
  cursor: pointer;
  height: 65%;
  width: 65%;
  border-radius: 50%;
  box-shadow: v-bind(shadow);
  transition: box-shadow 0.2s;
}
.desc {
  white-space: nowrap;
}
</style>