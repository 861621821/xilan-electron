<template>
  <div>
    <el-button @click="router.push('/script')">Script</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>