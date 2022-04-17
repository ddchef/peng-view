<template>
  <data-table
    :columns="columns"
    :data="userStore.list"
    :total="userStore.total"
    :page="userStore.page"
    :limit="userStore.limit"
    :operates="headerOperates"
    @change-limit="onChangeLimit"
    @change-page="onChangePage"
  />
</template>
<script setup lang="ts">
import { DataTableColumns, useDialog, useMessage } from 'naive-ui';
import { h } from 'vue';
import { useRouter } from 'vue-router';
import DataTable, { Operate } from '../../components/dataTable/index.vue';
import TableOperate, { TableOperateType } from '../../components/dataTable/operate.vue';
import { formatDate } from '../../utils/time';
import { deleteUser, putUserActive } from './api';
import { User, useUserStore } from './store';

const dialog = useDialog();
const router = useRouter();
const userStore = useUserStore();
const message = useMessage();
const headerOperates:Operate[] = [
  {
    permissionCode: 'userAdd',
    operateName: '新增',
    event: () => {
      router.push({ name: 'userAdd' });
    },
  },
  {
    permissionCode: 'userDelete',
    operateName: '删除',
    operateWithKey: true,
    operateType: 'error',
    event: (keys) => {
      dialog.warning({
        title: '警告',
        content: '确定删除选择内容?',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          console.log('确定');
        },
        onNegativeClick: () => {
          console.log('取消');
        },
      });
    },
  },
];

const onChangePage = (v:number) => {
  userStore.setPage(v);
};
const onChangeLimit = (v:number) => {
  userStore.setLimit(v);
};
userStore.getData();
const columns:DataTableColumns<User> = [
  {
    type: 'selection',
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
  {
    key: 'operate',
    title: '操作项',
    render: (rowData) => {
      const operates:TableOperateType[] = [
        {
          name: '编辑',
          code: 'userEdit',
          callback: () => {
            router.push({ name: 'userEdit', params: { id: rowData.id } });
          },
        },
        {
          name: '删除',
          code: 'userDelete',
          type: 'error',
          confirm: true,
          confirmMessage: '确定删除该账号？',
          callback: async () => {
            await deleteUser(rowData.id);
            message.success('删除成功');
            userStore.setPage(1);
          },
        },
        {
          name: rowData.active ? '禁用' : '激活',
          code: 'userActive',
          confirm: true,
          confirmMessage: '确定激活该账号？',
          callback: async () => {
            await putUserActive(rowData.id, { active: !rowData.active });
            message.success(rowData.active ? '禁用成功' : '激活成功');
            userStore.setPage(1);
          },
        },
        {
          name: '权限',
          code: 'userRoleEdit',
          callback: () => {
            // todo
          },
        },
      ];
      return h(TableOperate, { operates });
    },
  },
];
</script>
