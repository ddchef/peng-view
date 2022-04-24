<template>
  <n-layout :class="$style.full">
    <n-layout-header bordered>
      <m-header :logo="store.logo" :title="store.title" :user="store.user">
        <m-menus
          v-if="store.menuMode === 'top'"
          :active="active"
          :navigation="store.navigation"
          mode="horizontal"
        ></m-menus>
      </m-header>
    </n-layout-header>
    <n-layout :class="$style['without-header-height']" has-sider>
      <n-layout-sider
        v-if="store.menuMode === 'left'"
        width="200"
        bordered
        collapse-mode="transform"
        :collapsed-width="0"
        show-trigger
        :collapsed-trigger-style="{right:'-20px'}"
      >
        <m-menus
          :active="active"
          :navigation="store.navigation"
        ></m-menus>
      </n-layout-sider>
      <n-layout-content
        native-scrollbar
        :content-style="{
          'background-color': store.contentBodyColor
        }"
      >
        <div :class="$style.breadcrumb">
          <m-breadcrumb :value="breadcrumb"/>
        </div>
        <n-el tag="div"
          style="
            background-color: var(--body-color);
            margin: 10px;
            margin-top: 5px;
            min-height: calc(100% - 75px);
            border-radius: var(--border-radius);
            border: 1px solid;
            border-color: var(--border-color);
            padding: 10px;
          ">
          <router-view></router-view>
        </n-el>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import {
  NLayout, NLayoutHeader, NLayoutSider, NLayoutContent,
  NEl,
} from 'naive-ui';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MMenus from '../menus/index.vue';
import MHeader from '../header/index.vue';
import MBreadcrumb from '../breadcrumb/index.vue';
import { useMainStore } from '../../store';
import { findNearMenuName } from './utils';
import { Navigation } from '../../routes/index';

const route = useRoute();
const store = useMainStore();
const active = ref('');
const breadcrumb = ref<Navigation>();
watch(route, () => {
  const name = findNearMenuName(route);
  active.value = name;
  breadcrumb.value = store.navigationMap.get(route.name as string);
}, {
  immediate: true,
});
store.getUserInfo();
</script>
<style module lang="scss">
.full{
  height: 100%;
}
.without-header-height{
  height: calc(100% - 61px);
}
.breadcrumb{
  margin: 2px 10px;
}
</style>
