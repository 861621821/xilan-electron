<template>
  <div class="xl-note">
    <div class="note-btn">
      <el-button v-if="!isEdit" type="primary" circle @click="isEdit = true"><i class="iconfont icon-bianji"></i></el-button>
      <el-button v-else type="primary" circle @click="handleSave"><i class="iconfont icon-queren"></i></el-button>
    </div>
    <v-md-preview v-if="!isEdit" :text="noteStr"></v-md-preview>
    <v-md-editor v-else v-model="noteStr" height="100%"></v-md-editor>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const md = require('markdown-it')();
const { ipcRenderer } = require('electron');
const isEdit = ref(false);

// 获取记事本
const noteStr = ref('');
ipcRenderer.send('getMd', 'note'); // 向主进程通信
ipcRenderer.on('emitMd', (event, data) => {
  noteStr.value = data;
});

const handleSave = () => {
  ipcRenderer.send('saveNote', noteStr.value);
  setTimeout(() => {
    isEdit.value = false;
  });
};
</script>

<style lang="scss" scoped>
.xl-note {
  height: 100vh;
  .note-btn {
    text-align: right;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
  }
}
</style>