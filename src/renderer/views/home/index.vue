<template>
  <div class="xl-note">
    <template v-if="!isEdit">
      <div class="note-btn">
        <el-button type="primary" @click="isEdit = true">编辑</el-button>
      </div>
      <div v-html="noteStr" class="note-content"></div>
    </template>
    <div v-else class="edit-dom" ref="editDom"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const md = require('markdown-it')();
const { ipcRenderer } = require('electron');

// 获取记事本
const noteStr = ref('');
ipcRenderer.send('getMd', 'note'); // 向主进程通信
ipcRenderer.on('emitMd', (event, data) => {
  noteStr.value = md.render(data);
  console.log(noteStr.value);
});

const isEdit = ref(false);
</script>

<style lang="scss" scoped>
.xl-note {
  .note-btn {
    margin-bottom: 10px;
    text-align: right;
  }
}
</style>