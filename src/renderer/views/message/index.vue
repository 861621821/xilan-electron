<template>
  <div class="xl-msg-warp">
    <div class="xl-msg">
      <div class="xl-msg-title"><i class="iconfont icon-shouye"></i>日期提醒</div>
      <div class="xl-msg-body">今天是{{today}}除了主颜色外，您需要在不同的场景不同的场景中使用不同的不同的场景中使用不同的不同的场景中使用不同的场景颜色 (例如，危险的颜色表示危险的操作)</div>
      <div class="xl-msg-btn">
        <el-button type="primary">关闭</el-button>
        <el-button>确定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const today = ref(new Date().toLocaleString().split(' ')[0]);
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
  .xl-msg-title {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 2.2;
    .iconfont {
      font-size: 20px;
      margin-right: 5px;
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