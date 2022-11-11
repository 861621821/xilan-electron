<template>
  <div class="main-warp">
    <div class="menu-bar">
      <img src="@img/logo.png" class="logo" alt="" srcset="">
      <i class="iconfont icon-homefill active" @click="handlePageTo('/')"></i>
      <i class="iconfont icon-jiaobenguanli" @click="handlePageTo('/script')"></i>
    </div>
    <el-scrollbar style="flex: 1">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handlePageTo = (path) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
.main-warp {
  height: 100vh;
  // padding: 10px;
  // box-sizing: border-box;
  display: flex;
  .menu-bar {
    width: 60px;
    background: #2a2a2a;
    text-align: center;
    .logo {
      width: 40px;
      height: 40px;
      margin: 20px auto;
      display: block;
    }
    .iconfont {
      display: block;
      font-size: 26px;
      color: #f2f2f2;
      cursor: pointer;
      &.active {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>