<template>
  <div class="main-warp">
    <template v-if="route.name === 'Logo'">
      <router-view />
    </template>
    <template v-else-if="route.name === 'Message'">
      <router-view />
    </template>
    <template v-else>
      <!-- <div class="menu-bar">
        <img src="@img/logo.png" class="logo" alt="" srcset="">
        <i v-for="item in menu" :key="item.path" :class="[item.icon, item.path == route.path ? 'active' : '']" @click="router.push(item.path)"></i>
      </div>
      <div class="right-box" style="flex: 1">
        <div class="title-bar">
          <div class="page-title">{{route.meta.title}}</div>
          <div class="drag-area"></div>
          <div class="title-btn">
            <i class="iconfont icon-zuixiaohua" @click="ipcRenderer.send('minimize')"></i>
            <i class="iconfont icon-guanbi1" @click="ipcRenderer.send('hide')"></i>
          </div>
        </div>
      </div> -->

      <el-scrollbar style="flex: 1">
        <div class="selection">
          <router-view />
        </div>
      </el-scrollbar>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIpcRenderer } from '@vueuse/electron';

const menu = ref([
  { path: '/', icon: 'iconfont icon-homefill' },
  { path: '/script', icon: 'iconfont icon-jiaobenguanli' }
]);
const router = useRouter();
const route = useRoute();
const ipcRenderer = useIpcRenderer();
</script>

<style lang="scss" scoped>
.main-warp {
  height: 100vh;
  display: flex;
  // .menu-bar {
  //   width: 60px;
  //   background: #2a2a2a;
  //   text-align: center;
  //   .logo {
  //     width: 40px;
  //     height: 40px;
  //     margin: 20px auto;
  //     display: block;
  //   }
  //   .iconfont {
  //     display: block;
  //     font-size: 24px;
  //     color: #f2f2f2;
  //     cursor: pointer;
  //     margin: 5px 0;
  //     &.active {
  //       color: var(--el-color-primary);
  //     }
  //   }
  // }
  .right-box {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .title-bar {
    // -webkit-app-region: drag;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    &::after {
      content: '';
      display: inline-block;
      height: 1px;
      width: 100%;
      background: #cccccc;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scaleY(0.2);
    }
    .page-title {
      font-size: 18px;
      font-weight: 500;
    }
    .drag-area {
      flex: 1;
    }
    .title-btb {
      -webkit-app-region: no-drag;
    }
    .iconfont {
      font-size: 12px;
      margin-left: 20px;
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
  }
  .selection {
    height: 100%;
    width: 100%;
    & > div {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
    }
  }
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
}
</style>