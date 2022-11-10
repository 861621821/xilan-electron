<template>
  <div class="xl-script">
    <template v-if="!isEdit">
      <!-- <div class="script-btn">
        <el-button type="primary" @click="hanldeAdd">新增脚本</el-button>
      </div> -->
      <div class="script-list">
        <el-table :data="scriptData" stripe style="width: 100%">
          <el-table-column prop="scriptId" label="ID" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="status" label="状态" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button type="primary" link>启用</el-button>
              <el-button type="primary" link>停用</el-button>
              <el-button type="primary" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template v-else>
      <Edit v-model="scriptObj.content"></Edit>
      <div class="save-btn">
        <el-button size="small" @click="isEdit = false">返回</el-button>
        <el-button size="small" type="primary" @click="hanldeSave">保存</el-button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useIpcRenderer } from '@vueuse/electron';
import { ElMessageBox } from 'element-plus';
// import Edit from './edit.vue';
const ipcRenderer = useIpcRenderer();

// 获取脚本数据
const scriptData = ref([]);
ipcRenderer.send('getScript'); // 向主进程通信
ipcRenderer.on('emitScript', (event, data) => {
  scriptData.value = data;
});

const isEdit = ref(false);
const scriptObj = reactive({ title: '', content: '' });
const hanldeAdd = () => {
  ElMessageBox.prompt('', '标题', {
    confirmButtonText: '编写脚本',
    cancelButtonText: '取消',
    customStyle: 'width: 250px',
    buttonSize: 'small'
  })
    .then(({ value }) => {
      scriptObj.title = value;
      isEdit.value = true;
    })
    .catch(() => {});
};

const hanldeSave = () => {
  isEdit.value = false;
};
</script>

<style lang="scss" scoped>
.xl-script {
  height: 100%;
  width: 100%;
  position: relative;
}
.script-btn {
  margin-bottom: 10px;
}
.save-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
</style>