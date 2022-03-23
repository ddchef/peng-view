<template>
  <n-layout :class="$style.full">
    <n-layout-header bordered>
      <m-header :logo="$state.logo" :title="$state.title" :user="$state.user">
        <m-menus
          v-if="$state.menuMode === 'top'"
          :active="active"
          :navigation="$state.navigation"
          mode="horizontal"
        ></m-menus>
      </m-header>
    </n-layout-header>
    <n-layout :class="$style['without-header-height']" has-sider>
      <n-layout-sider
        v-if="$state.menuMode === 'left'"
        width="200"
        bordered
        collapse-mode="transform"
        :collapsed-width="0"
        show-trigger
        :collapsed-trigger-style="{right:'-20px'}"
      >
        <m-menus
          :active="active"
          :navigation="$state.navigation"
        ></m-menus>
      </n-layout-sider>
      <n-layout-content
        native-scrollbar
      >
        <div :class="$style.breadcrumb">
          <m-breadcrumb :value="breadcrumb"/>
        </div>
        <n-el tag="div"
          style="
            background-color: var(--n-color);
            min-height: calc(100% - 20px);
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
import { Navigation } from '../../routes/config';

const route = useRoute();
const { $state } = useMainStore();
const active = ref('');
const breadcrumb = ref<Navigation>();
watch(route, () => {
  const name = findNearMenuName(route);
  active.value = name;
  breadcrumb.value = $state.navigationMap.get(route.name as string);
}, {
  immediate: true,
});
</script>
<style module lang="scss">
.full{
  height: 100%;
}
.without-header-height{
  height: calc(100% - 61px);
}
.breadcrumb{
  padding: 5px 10px;
  position: absolute;
  top: 0px;
}
</style>
