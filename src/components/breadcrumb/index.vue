<template>
  <n-breadcrumb>
    <template v-for="b in breadcrumb"  :key="b.name">
      <n-breadcrumb-item v-if="b.path" >
        <router-link :to="{name:b.name}">{{b.title}}</router-link>
      </n-breadcrumb-item>
      <n-breadcrumb-item v-else>{{b.title}}</n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import { withDefaults, defineProps, computed } from 'vue';
import { Navigation } from '../../routes/config';

const props = withDefaults(defineProps<{
  value: Navigation | undefined
}>(), { value: undefined });
const breadcrumb = computed(() => {
  let nav:Navigation|null|undefined = props.value;
  const _ = [];
  while (nav) {
    _.push({
      path: nav.path,
      title: nav.title,
      name: nav.name,
    });
    nav = nav.parent;
  }
  return _.reverse();
});
</script>
