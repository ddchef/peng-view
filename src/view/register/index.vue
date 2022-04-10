<template>
  <div :class="[$style.canvas,$style['login-card']]">
    <n-space vertical align="center" justify="center" style="height: 100%;">
      <n-card title="注册" hoverable size="huge" style="min-width: 500px;">
        <n-form label-width="60" label-placement="left" label-align="right">
          <n-form-item label="用户名">
            <n-input v-model:value="form.username" placeholder="请输入用户名"></n-input>
          </n-form-item>
          <n-form-item label="邮箱">
            <n-input v-model:value="form.email" placeholder="请输入邮箱"></n-input>
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
import { register, getCode } from './api';

const router = useRouter();
const message = useMessage();

const form = ref<{
  username: string,
  email:string,
  password: string,
  code: string,
  id:string
}>({
  username: '',
  email: '',
  password: '',
  code: '',
  id: '',
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

const handleRegister = () => {
  register<any>(form.value).then((res) => {
    if (res.error_code !== 0) {
      refresh();
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
