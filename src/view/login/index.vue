<template>
  <canvas
    :height="canvasHeight"
    :width="canvasWidth"
    :class="$style.canvas"
    ref="canvasRef"
  ></canvas>
  <div :class="[$style.canvas,$style['login-card']]">
    <n-space vertical align="center" justify="center" style="height: 100%;">
      <n-spin :show="showLoading">
        <template #description>
          登录中...
        </template>
        <n-card title="登录" hoverable size="huge" style="min-width: 500px;">
          <n-form label-width="60" label-placement="left" label-align="right">
            <n-form-item label="用户名">
              <n-input v-model:value="form.username" placeholder="请输入用户名"></n-input>
            </n-form-item>
            <n-form-item label="密码">
              <n-input
                v-model:value="form.password"
                placeholder="请输入密码"
                type="password"
                show-password-on="mousedown"
              ></n-input>
            </n-form-item>
            <n-form-item label="验证码">
              <n-space>
                  <n-input
                    v-model:value="form.code"
                    placeholder="请输入验证码"
                  ></n-input>
                  <img @click="refresh" style="height: 30px;" :src="codeUrl">
              </n-space>
            </n-form-item>
          </n-form>
          <n-space justify="end" align="flex-end">
            <n-button text @click="handleRegister">注册</n-button>
            <n-button text>忘记密码</n-button>
            <n-button type="primary" @click="handleLogin">登&nbsp;录</n-button>
          </n-space>
        </n-card>
      </n-spin>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import {
  NButton, NSpace, NCard, NForm, NFormItem, NInput, useMessage,
  NSpin,
} from 'naive-ui';
import {
  onBeforeUnmount, onMounted, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import config from '../../routes/config';
import { useMainStore } from '../../store';
import { login, getCode } from './api';

const form = ref<{
  username:string,
  password: string,
  code: string,
  id:string
}>({
  username: '',
  password: '',
  code: '',
  id: '',
});
const showLoading = ref(false);

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

// 验证码
const codeUrl = ref('');
const refresh = () => {
  getCode<string>().then((res) => {
    form.value.id = res.data;
    codeUrl.value = `/api/public/captcha/${res.data}`;
  });
};
refresh();

const router = useRouter();
const store = useMainStore();
const message = useMessage();
const handleLogin = () => {
  showLoading.value = true;
  login<
    {access_token:string, expires_in:number, token_type:string}
    >(form.value).then((res) => {
      showLoading.value = false;
      if (res.error_code !== 0) {
        refresh();
        message.error(res.message);
        return;
      }
      message.success('登录成功');
      store.setToken(`${res.data.token_type} ${res.data.access_token}`);
      store.fetchPermissions(config, router);
      router.replace({ path: '/' });
    });
};
const handleRegister = () => {
  router.push('/register');
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
