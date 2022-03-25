<template>
  <h1>登录</h1>
  <n-button @click="handleLogin">登录</n-button>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui';
import { useRouter } from 'vue-router';
import config from '../../routes/config';
import { useMainStore } from '../../store';

const router = useRouter();
const store = useMainStore();
const handleLogin = () => {
  store.setToken('12345');
  store.fetchPermissions(config, router);
  router.replace({ name: 'user' });
};
</script>
