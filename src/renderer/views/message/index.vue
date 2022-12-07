<template>
  <div class="xl-msg-warp">
    <div class="xl-msg">
      <div class="xl-msg-title"></div>
      <div class="xl-msg-body">{{msg.content}}</div>
      <div class="xl-msg-btn">
        <el-button type="primary" v-for="(btn, i) in msg.btn" :key="i" @click="handleClick(btn)">{{btn.text}}</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { ipcRenderer } = require('electron');

const msg = ref({});
ipcRenderer.on('emitMsg', (event, data) => {
  msg.value = data;
});

const handleClick = (btn) => {
  ipcRenderer.send('msgBtnClick', JSON.stringify(btn)); // 向主进程通信
};
</script>

<style lang="scss" scoped>
.xl-msg-warp {
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}
.xl-msg {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  position: relative;
  color: var(--el-color-primary);
  .xl-msg-title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 2.2;
    min-height: 20px;
    -webkit-app-region: drag;
    .iconfont {
      font-size: 20px;
      margin-right: 8px;
    }
  }
  .xl-msg-body {
    text-indent: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    /*将对象作为弹性伸缩盒子模型显示*/
    display: -webkit-box;
    /*用来限制在一个块元素中显示的文本的行数*/
    -webkit-line-clamp: 3;
    /*设置伸缩盒对象的子元素的排列方式*/
    -webkit-box-orient: vertical;
  }
  .xl-msg-btn {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>