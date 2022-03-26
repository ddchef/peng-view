<template>
  <n-space size="small">
    <div :class="$style.breadcrumb">
      <n-breadcrumb>
        <template v-for="b in breadcrumb"  :key="b.name">
          <n-breadcrumb-item v-if="b.path" >
            <router-link :to="{name:b.name}">{{b.title}}</router-link>
          </n-breadcrumb-item>
          <n-breadcrumb-item v-else>{{b.title}}</n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <n-tooltip v-if="superiorArr.length>1" placement="right" trigger="hover">
      <template #trigger>
        <n-button quaternary circle size="small" @click="handleGoBack">
          <template #icon>
            <n-icon>
              <ArrowBackCircle/>
            </n-icon>
          </template>
        </n-button>
      </template>
      <span>返回上级</span>
    </n-tooltip>
  </n-space>
</template>
<script setup lang="ts">
import {
  NBreadcrumb, NBreadcrumbItem, NSpace, NButton,
  NIcon, NTooltip,
} from 'naive-ui';
import {
  withDefaults, defineProps, computed,
} from 'vue';
import { ArrowBackCircle } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';
import { Navigation } from '../../routes/index';

const router = useRouter();
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
const superiorArr = computed(() => breadcrumb.value.filter((b) => b.path));
const handleGoBack = () => {
  router.go(-1);
};
</script>

<style module lang="scss">
.breadcrumb{
  padding: 3px 0 4px;
}
</style>
