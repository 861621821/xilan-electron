<template>
  <div class="xl-script">
    <div class="script-btn">
      <el-button type="primary" circle @click="dialogVisible = true"><i class="iconfont icon-daoru"></i></el-button>
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
            <el-button type="primary" :disabled="row.status === 1" link @click="handleUpdate(row)">更新</el-button>
            <el-button type="primary" :disabled="row.status === 1" link @click="handleEnable(row)">启用</el-button>
            <el-button type="primary" :disabled="row.status === -1" link @click="handleStop(row)">停用</el-button>
            <el-button type="primary" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="新增脚本" width="420px">
      <el-form ref="form" :model="script" label-width="80px">
        <el-form-item label="脚本名称">
          <el-input v-model="script.title"></el-input>
        </el-form-item>
        <el-form-item label="脚本文件" class="script-file">
          <el-upload v-model:file-list="script.fileList" ref="upload" action="" :limit="1" :on-exceed="handleExceed" :auto-upload="false">
            <template #trigger>
              <el-button text type="primary">选择脚本</el-button>
            </template>
          </el-upload>
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
const { ipcRenderer } = require('electron');

// 获取脚本数据
const scriptData = ref([]);
ipcRenderer.send('getScript'); // 向主进程通信
ipcRenderer.on('emitScript', (event, data) => {
  scriptData.value = data;
});

const handleUpdate = ({ id }) => {};

const handleEnable = ({ id }) => {
  ipcRenderer.send('operateScript', { id, type: 'enable' });
  getScript();
};
const handleStop = ({ id }) => {
  ipcRenderer.send('operateScript', { id, type: 'stop' });
  getScript();
};
const handleDelete = ({ id }) => {
  ipcRenderer.send('operateScript', { id, type: 'delete' });
  getScript();
};

// 上传
const dialogVisible = ref(false);
const script = reactive({ title: '', fileList: [] });

const handleSave = async () => {
  const fileToText = (file) => {
    return new Promise((r) => {
      const reader = new FileReader();
      reader.onload = () => {
        r(reader.result);
      };
      reader.readAsText(file);
    });
  };
  const fileName = script.fileList[0].name;
  const content = await fileToText(script.fileList[0].raw);
  // ipcRenderer.send('addScript', JSON.stringify(script)); // 向主进程通信
  ipcRenderer.send('operateScript', { id: null, type: 'add', script: { title: script.title, fs: { fileName, content } } });
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.xl-script {
  position: relative;
  :deep(.script-file) {
    .el-form-item__content > div {
      width: 100%;
    }
  }
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