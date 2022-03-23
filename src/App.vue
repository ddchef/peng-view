<template>
  <n-config-provider :class="$style.full" :theme="theme" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import {
  NConfigProvider, NGlobalStyle, NMessageProvider, darkTheme,
} from 'naive-ui';
import { computed } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import { useMainStore } from './store';

const { $state } = useMainStore();
const theme = computed(() => {
  if ($state.theme === 'dark') return darkTheme;
  return null;
});
const themeOverrides:GlobalThemeOverrides = {};
</script>
<style module lang="scss">
.full{
  height: 100%;
}
</style>
