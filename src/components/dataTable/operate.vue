<template>
  <n-space>
    <template v-for="op in opts" :key="op.code">
      <template v-if="Array.isArray(op)">
        <n-popover
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <n-button type="info" quaternary >更多</n-button>
          </template>
          <n-space vertical>
            <n-button
              v-for="bt in op"
              quaternary
              :type="bt.type||'info'"
              :key="bt.code"
              @click="()=>handleOperate(bt)"
            >{{bt.name}}</n-button>
          </n-space>
        </n-popover>
      </template>
      <n-button
        v-else
        quaternary
        :type="op.type||'info'"
        @click="()=>handleOperate(op)"
      >{{op.name}}</n-button>
    </template>
  </n-space>
</template>
<script setup lang="ts">
import {
  withDefaults, defineProps, computed,
} from 'vue';
import {
  NSpace, NButton, NPopover, useDialog,
} from 'naive-ui';
import { BtnType } from './index.vue';

export interface TableOperateType{
    name: string,
    code: string,
    callback:()=>void,
    type?: BtnType,
    confirm?: boolean
    confirmMessage?: string,
}

const dialog = useDialog();
const props = withDefaults(defineProps<{
  operates:TableOperateType[]
}>(), {
  operates: () => [],
});

const opts = computed(() => props.operates.reduce((pre:TableOperateType[], cur) => {
  if (props.operates.length <= 3 || pre.length < 2) {
    // @ts-ignore
    pre.push(cur);
    return pre;
  }
  if (pre.length === 2) {
    // @ts-ignore
    pre.push([cur]);
    return pre;
  }
  // @ts-ignore
  pre[2].push(cur);
  return pre;
}, []));

const handleOperate = (operate:TableOperateType) => {
  if (operate.confirm) {
    dialog.warning({
      title: '警告',
      content: operate.confirmMessage,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        operate.callback();
      },
      onNegativeClick: () => {
        console.log('取消');
      },
    });
    return;
  }
  operate.callback();
};
</script>
