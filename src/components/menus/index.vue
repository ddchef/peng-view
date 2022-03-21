<template>
  <n-menu :value="props.active" :options="menusOptions"/>
</template>
<script setup lang="ts">
import { NMenu } from 'naive-ui';
import { withDefaults, defineProps } from 'vue';
import { Navigation } from '../../routes/config';
import { NavigationToMenuOption } from './utils';

const props = withDefaults(defineProps<{
  active: string,
  navigation: Navigation[]
}>(), {
  active: '',
});
const menusOptions = NavigationToMenuOption(props.navigation);
</script>
