<template>
  <n-menu :value="props.active" :options="menusOptions" :mode="props.mode"/>
</template>
<script setup lang="ts">
import { NMenu } from 'naive-ui';
import { withDefaults, defineProps } from 'vue';
import { Navigation } from '../../routes/index';
import { NavigationToMenuOption } from './utils';

const props = withDefaults(defineProps<{
  active: string,
  navigation: Navigation[],
  mode?: 'vertical' | 'horizontal'
}>(), {
  active: '',
  mode: 'vertical',
});
const menusOptions = NavigationToMenuOption(props.navigation);
</script>
