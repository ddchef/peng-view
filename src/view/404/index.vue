<template>
  <n-empty description="你好像迷路了" size="huge">
    <template #icon>
      <n-icon>
        <Ban/>
      </n-icon>
    </template>
    <template #extra>
      <n-button>返回</n-button>
    </template>
  </n-empty>
</template>
<script lang="ts" setup>
import { NEmpty, NIcon, NButton } from 'naive-ui';
import { Ban } from '@vicons/ionicons5';
</script>
