<template>
  <div :class="[$style.canvas,$style['login-card']]">
    <n-space vertical align="center" justify="center" style="height: 100%;">
      <n-card title="注册" hoverable size="huge" style="min-width: 500px;">
        <n-form label-width="60" label-placement="left" label-align="right">
          <n-form-item label="用户名">
            <n-input v-model:value="form.name" placeholder="请输入用户名"></n-input>
          </n-form-item>
          <n-form-item label="手机号">
            <n-input v-model:value="form.mobile" placeholder="请输入手机号"></n-input>
          </n-form-item>
          <n-form-item label="密码">
            <n-input
              v-model:value="form.password"
              placeholder="请输入密码"
              type="password"
              show-password-on="mousedown"
            ></n-input>
          </n-form-item>
        </n-form>
        <n-space justify="end" align="flex-end">
          <n-button @click="router.go(-1)">返回</n-button>
          <n-button type="primary" @click="handleRegister">注&nbsp;册</n-button>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>
<script setup lang="ts">
import {
  NButton, NSpace, NCard, NForm, NFormItem, NInput, useMessage,
} from 'naive-ui';
import {
  ref,
} from 'vue';
import { useRouter } from 'vue-router';
import { register } from './api';

const router = useRouter();
const message = useMessage();

const form = ref<{
  name: string,
  mobile:string,
  password: string
}>({
  name: '',
  mobile: '',
  password: '',
});

const handleRegister = () => {
  register<any>(form.value).then((res) => {
    if (res.error_code !== 0) {
      message.error(res.message);
      return;
    }
    message.success('注册成功');
    router.go(-1);
  });
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
