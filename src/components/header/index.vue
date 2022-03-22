<template>
  <div :class="$style['peng-header']">
    <div :class="$style['peng-logo']">
      <img :class="$style['peng-logo']" src="@/assets/logo.png" />
    </div>
    <div :class="$style['peng-title']">{{ props.title }}</div>
    <div :class="$style['peng-user']">
      <n-space :size="0" align="center" style="height: 40px;">
        <n-avatar size="medium" round :src="props.user?.avatar"></n-avatar>
        <n-divider vertical />
        <n-dropdown trigger="click" show-arrow :options="options">
          <n-button text>
            <n-ellipsis>{{ props.user.realName }}</n-ellipsis>
          </n-button>
        </n-dropdown>
      </n-space>
    </div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';
import {
  NSpace, NAvatar, NDivider, NEllipsis, NDropdown, NButton,
} from 'naive-ui';
import { User } from '../../store/index';

const props = withDefaults(defineProps<{
  logo: string,
  title: string,
  subTitle?: string,
  user: User
}>(), {});
const options = [
  {
    key: 'change-password',
    label: '修改密码',
  },
  {
    key: 'logout',
    label: '退出',
  },
];
</script>
<style module scoped lang="scss">
.peng-header {
  padding: 10px 15px;
  display: flex;
}
.peng-logo {
  height: 40px;
  width: 40px;
}
.peng-title {
  flex: 1;
  font-size: 18px;
  line-height: 40px;
  padding: 0 10px;
  height: 40px;
}
.peng-user {
  height: 40px;
}
</style>
