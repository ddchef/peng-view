<template>
  <n-data-table :columns="props.columns" :data="props.data"></n-data-table>
  <n-space justify="end" style="margin: 10px 0;">
    <n-pagination
      :page="props.page"
      :page-size="props.limit"
      :page-sizes="pageSizes"
      :item-count="props.total"
      show-quick-jumper
      show-size-picker
      @update-page="page=>emit('changePage',page)"
      @update-page-size="size=>emit('changeLimit',size)"
    >
      <template #prefix>
        共{{props.total}}项
      </template>
    </n-pagination>
  </n-space>
</template>
<script setup lang="ts">
import {
  withDefaults, defineProps, computed, defineEmits,
} from 'vue';
import {
  NDataTable, DataTableColumns, NPagination, NSpace,
} from 'naive-ui';

const props = withDefaults(defineProps<{
  columns: DataTableColumns<any>,
  data: Record<string, any>[],
  total: number,
  page: number,
  limit: number,
  pageSizes?: number[]
}>(), {
  columns: () => [],
  data: () => [],
  total: 0,
  page: 1,
  limit: 20,
  pageSizes: () => [10, 20, 30, 40],
});

const emit = defineEmits<{(e: 'changePage', value: number): void,
  (e: 'changeLimit', value: number):void
}>();

const pageCount = computed(() => Math.ceil(props.total / props.limit));
const pageSizes = computed(() => props.pageSizes.map((size) => ({ label: `${size}/页`, value: size })));
</script>
