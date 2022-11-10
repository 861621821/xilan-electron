<template>
  <div class="xl-script">
    <div class="script-button">
      <el-button
        type="primary"
        @click="hanldeAdd"
      >新增脚本</el-button>
    </div>
    <div class="script-list">
      <el-table
        :data="scriptData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="scriptId"
          label="ID"
          width="200"
        />
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
            <el-button
              type="primary"
              link
            >启用</el-button>
            <el-button
              type="primary"
              link
            >停用</el-button>
            <el-button
              type="primary"
              link
            >删除</el-button>
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
const ipcRenderer = useIpcRenderer();

// 获取脚本数据
const scriptData = ref([]);
ipcRenderer.send('getScript'); // 向主进程通信
ipcRenderer.on('onDate', (event, data) => {
  scriptData.value = data;
});

const hanldeAdd = () => {
  ipcRenderer.send('openMsgBox');
};
</script>

<style lang="scss" scoped>
.script-button {
  margin-bottom: 10px;
}
</style>