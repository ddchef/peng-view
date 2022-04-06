<template>
  <data-table
    :columns="columns"
    :data="data"
    :total="total"
    :page="page"
    :limit="limit"
    @change-limit="onChangeLimit"
    @change-page="onChangePage"
  />
</template>
<script setup lang="ts">
import { DataTableColumns } from 'naive-ui';
import { ref } from 'vue';
import { getUserList } from './api';
import DataTable from '../../components/dataTable/index.vue';
import { formatDate } from '../../utils/time';

interface User{
  id:number,
  username:string,
  email: string,
  active: string,
  created_at: string,
  updated_at: string,
}

const total = ref(0);
const page = ref(1);
const data = ref<User[]>([]);
const limit = ref(20);
const getData = () => {
  getUserList<{total:number, list:User[]}>(
    { offset: (page.value - 1) * limit.value, limit: limit.value },
  ).then((res) => {
    if (res.error_code === 0) {
      data.value = res.data.list;
      total.value = res.data.total;
    }
  });
};
getData();
const onChangePage = (v:number) => {
  page.value = v;
  getData();
};
const onChangeLimit = (v:number) => {
  limit.value = v;
  getData();
};

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
    key: 'email',
    title: '邮箱',
  },
  {
    key: 'active',
    title: '状态',
    render: (rowData) => {
      if (rowData.active) return '激活';
      return '未激活';
    },
  },
  {
    key: 'created_at',
    title: '创建时间',
    render: (rowData) => formatDate(rowData.created_at),
  },
  {
    key: 'updated_at',
    title: '最后更新时间',
    render: (rowData) => formatDate(rowData.updated_at),
  },
];
</script>
