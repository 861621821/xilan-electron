<template>
  <div class="xl-script">
    <div class="script-button">
      <el-button type="primary">新增脚本</el-button>
    </div>
    <div class="script-list">
      <el-table
        :data="scriptData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="标题"
          width="200"
        />
        <el-table-column
          prop="content"
          label="内容"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="200"
        />
        <el-table-column
          label="操作"
          width="180"
        >
          <template #default="{row}">
            <el-button type="text">启用</el-button>
            <el-button type="text">停用</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="script-list"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIpcRenderer } from '@vueuse/electron';
// 获取脚本数据
const scriptData = ref([]);
const ipcRenderer = useIpcRenderer();
ipcRenderer.send('getScript'); // 向主进程通信
ipcRenderer.on('onDate', (event, data) => {
  scriptData.value = data;
});
</script>

<style lang="scss" scoped>
.xl-script {
  padding: 10px;
  box-sizing: border-box;
}
.script-button {
  margin-bottom: 10px;
}
</style>