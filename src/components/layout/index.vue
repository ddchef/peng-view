<template>
  <n-layout :class="$style.full">
    <n-layout-header bordered>
      <main-header :logo="$state.logo" :title="$state.title" :user="$state.user"></main-header>
    </n-layout-header>
    <n-layout :class="$style.full" has-sider>
      <n-layout-sider width="150" bordered>
        <main-menus :active="active" :navigation="$state.navigation"></main-menus>
      </n-layout-sider>
      <n-layout-content>
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import {
  NLayout, NLayoutHeader, NLayoutSider, NLayoutContent,
} from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MainMenus from '../menus/index.vue';
import MainHeader from '../header/index.vue';
import { useMainStore } from '../../store';
import { findNearMenuName } from './utils';

const route = useRoute();
const { $state } = useMainStore();
const active = ref('');
watch(route, () => {
  const name = findNearMenuName(route);
  active.value = name;
}, {
  immediate: true,
});
</script>
<style module lang="scss">
.full{
  height: 100%;
}
</style>
