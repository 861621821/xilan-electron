<template>
  <div class="script-edit-warp" ref="editDom"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as monaco from 'monaco-editor';

const props = defineProps({
  modelValue: String
});
const emit = defineEmits(['update:modelValue']);

const editDom = ref();
onMounted(() => {
  let edit = monaco.editor.create(editDom.value, {
    value: props.modelValue,
    tabSize: 2,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    scrollBeyondLastLine: true
  });

  edit.onDidChangeModelContent(() => {
    const value = edit.getValue();
    console.log(value);
    emit('update:modelValue', value);
  });
});
</script>

<style lang="scss" scoped>
.script-edit-warp {
  height: 100%;
}
</style>