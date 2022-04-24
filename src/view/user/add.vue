<template>
  <n-form ref="formRef" :model="form" :rules="rules" label-width="80" label-placement="left">
    <n-form-item label="用户名" path="username">
      <n-input v-model:value="form.username" placeholder="请输入用户名"></n-input>
    </n-form-item>
    <n-form-item label="邮箱" path="email">
      <n-input v-model:value="form.email" placeholder="请输入邮箱"></n-input>
    </n-form-item>
    <n-form-item label="真实姓名" path="realName">
      <n-input v-model:value="form.realName" placeholder="请输入真实姓名"></n-input>
    </n-form-item>
    <n-form-item>
      <n-space>
        <n-button @click="router.back()">取消</n-button>
        <n-button @click="handleSubmit">确认</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>
<script setup lang="ts">
import {
  NButton, NForm, NFormItem, NInput, NSpace, useMessage,
} from 'naive-ui';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUser, postUser, putUser } from './api';
import { useUserStore } from './store';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const message = useMessage();
const formRef = ref(null);
interface User {
  username:string,
  email:string,
  realName: string
}
const form = ref<User>({
  username: '',
  email: '',
  realName: '',
});
const rules = {
  username: [
    { required: true, message: '必填项' },
  ],
  email: [
    { required: true, message: '必填项' },
  ],
  realName: [
    { required: true, message: '必填项' },
  ],
};
const { id } = route.params;
const handleSubmit = () => {
  // @ts-ignore
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (id !== undefined) {
        putUser(id as string, form.value).then(() => {
          message.success('更新成功');
          router.back();
        });
        return;
      }
      postUser(form.value).then(() => {
        message.success('新增成功');
        router.back();
      });
    }
  });
};
if (id !== undefined) {
  getUser<User>(id as string).then((res) => {
    form.value = res.data;
  });
}
</script>
