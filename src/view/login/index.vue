<template>
  <canvas
    :height="canvasHeight"
    :width="canvasWidth"
    :class="$style.canvas"
    ref="canvasRef"
  ></canvas>
  <div :class="[$style.canvas,$style['login-card']]">
    <n-space vertical align="center" justify="center" style="height: 100%;">
      <n-card title="登录" hoverable size="huge" style="min-width: 500px;">
        <n-form label-width="60" label-placement="left" label-align="right">
          <n-form-item label="用户名">
            <n-input placeholder="请输入用户名"></n-input>
          </n-form-item>
          <n-form-item label="密码">
            <n-input placeholder="请输入密码" type="password" show-password-on="mousedown"></n-input>
          </n-form-item>
        </n-form>
        <n-space justify="end" align="flex-end">
          <n-button text>注册</n-button>
          <n-button text>忘记密码</n-button>
          <n-button type="primary" @click="handleLogin">登&nbsp;录</n-button>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import {
  NButton, NSpace, NCard, NForm, NFormItem, NInput,
} from 'naive-ui';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import config from '../../routes/config';
import { useMainStore } from '../../store';

// TODO 登录背景
const canvasRef = ref(null);
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const canvasResize = () => {
  canvasWidth.value = document.body.offsetWidth;
  canvasHeight.value = document.body.offsetWidth;
};
const resizeObserver = ref<ResizeObserver>();
onMounted(() => {
  canvasResize();
  resizeObserver.value = new ResizeObserver(canvasResize);
  resizeObserver.value.observe(document.body);
});
onBeforeUnmount(() => {
  resizeObserver.value?.unobserve(document.body);
});

const router = useRouter();
const store = useMainStore();
const handleLogin = () => {
  store.setToken('12345');
  store.fetchPermissions(config, router);
  router.replace({ name: 'user' });
};
</script>
<style module lang="scss">
.canvas{
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
}
.login-card{
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
