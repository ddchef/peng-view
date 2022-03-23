<template>
  <div :class="$style['peng-header']">
    <div :class="$style['peng-title']">{{ props.title }}</div>
    <div :class="$style['peng-menus']">
      <slot></slot>
    </div>
    <div :class="$style['peng-user']">
      <n-space :size="0" align="center" style="height: 40px;">
        <n-button quaternary circle @click="handleToggleTheme">
          <template #icon>
            <n-icon size="18">
              <sunny-outline v-show="$state.theme === 'light'"></sunny-outline>
              <moon-outline v-show="$state.theme === 'dark'"></moon-outline>
            </n-icon>
          </template>
        </n-button>
        <n-divider vertical />
        <n-avatar size="small" bordered round :src="props.user?.avatar"></n-avatar>
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
  NSpace, NAvatar, NDivider, NEllipsis, NDropdown, NButton, NIcon,
} from 'naive-ui';
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5';
import { useMainStore, User } from '../../store/index';

const { $state, toggleTheme } = useMainStore();
const handleToggleTheme = () => {
  toggleTheme();
};

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
.peng-menus {
  flex: 1;
}
.peng-title {
  max-width: 200px;
  font-size: 18px;
  line-height: 40px;
  padding: 0 10px;
  height: 40px;
}
.peng-user {
  height: 40px;
}
</style>
