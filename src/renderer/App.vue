<template>
  <div class="main-warp">
    <div class="menu-bar">
      <img src="@img/logo.png" class="logo" alt="" srcset="">
    </div>
    <el-scrollbar>
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script setup>
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
    .logo {
      width: 40px;
      height: 40px;
    }
  }
}
</style>