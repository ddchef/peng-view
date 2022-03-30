<template>
  <n-data-table :columns="columns" :data="data"></n-data-table>
</template>
<script setup lang="ts">
import { NDataTable, DataTableColumns } from 'naive-ui';
import { reactive } from 'vue';
import { getUserList } from './api';

interface User{
  id:number,
  username:string,
  mobile: string,
  timestamps: string,
}
const data = reactive<User[]>([]);
getUserList<User>().then((res) => {
  if (res.error_code === 0) {
    console.log(res.data);
  }
});
const columns:DataTableColumns<User> = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'username',
    title: '用户名',
  },
  {
    key: 'mobile',
    title: '手机号',
  },
  {
    key: 'timestamps',
    title: '创建时间',
  },
];
</script>
