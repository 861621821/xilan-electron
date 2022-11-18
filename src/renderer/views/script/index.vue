<template>
  <div class="xl-script">
    <div class="script-btn">
      <el-button type="primary" circle @click="dialogVisible = true"><i class="iconfont icon-bianji"></i></el-button>
      <el-button type="primary" circle @click="ipcRenderer.send('relaunch');"><i class="iconfont icon-chongqi"></i></el-button>
    </div>
    <div class="script-list">
      <el-table :data="scriptData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="status" label="状态">
          <template #default="{row}">
            {{row.status == 1 ? '启用' : '停用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="primary" link>启用</el-button>
            <el-button type="primary" link>停用</el-button>
            <el-button type="primary" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="新增脚本" width="70%">
      <el-form ref="form" :model="script" label-width="80px">
        <el-form-item label="脚本名称">
          <el-input v-model="script.title"></el-input>
        </el-form-item>
        <el-form-item label="脚本内容">
          <el-input type="textarea" :rows="8" resize="none" v-model="script.content"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button type="primary" plain @click="dialogVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
// import { useIpcRenderer } from '@vueuse/electron';
const { ipcRenderer } = require('electron');
// const ipcRenderer = useIpcRenderer();

// 获取脚本数据
const scriptData = ref([]);
ipcRenderer.send('getScript'); // 向主进程通信
ipcRenderer.on('emitScript', (event, data) => {
  scriptData.value = data;
});

const dialogVisible = ref(false);
const script = reactive({ title: '', content: '' });

const handleSave = () => {
  ipcRenderer.send('addScript', JSON.stringify(script)); // 向主进程通信
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.xl-script {
  position: relative;
}
.script-btn {
  text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.save-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}
</style>