<template>
  <n-form  label-placement="left" label-width="100">
    <n-grid :cols="4">
      <n-form-item-gi :span="1" label="菜单位置：">
        <n-radio-group v-model:value="store.menuMode">
          <n-radio value="left">左部</n-radio>
          <n-radio value="top" >顶部</n-radio>
        </n-radio-group>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>
<script setup lang="ts">
import {
  NGrid, NFormItemGi, NForm, NColorPicker,
  NRadioGroup, NRadio,
} from 'naive-ui';
import { useMainStore } from '../../store';

const store = useMainStore();
</script>
<style module lang="scss">
.setting-label{
  text-align: right;
}
</style>
