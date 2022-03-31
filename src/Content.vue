<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { useMessage } from 'naive-ui';

window.$message = useMessage();
</script>
