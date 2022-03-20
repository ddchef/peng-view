<template>
  <n-layout>
    <n-layout-header bordered>
      <main-header :logo="$state.logo" :title="$state.title" :user="$state.user"></main-header>
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider>
        <main-menus :menus="$state.navigation"></main-menus>
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
import MainMenus from '../menus/index.tsx';
import MainHeader from '../header/index.vue';
import { useMainStore } from '../../store';

const { $state } = useMainStore();
</script>
