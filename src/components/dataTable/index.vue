<template>
  <div v-if="props.operates?.length>0" :class="$style['header-operate']">
    <n-space>
      <template v-for="op in props.operates" :key="op.permissionCode">
        <n-button
          v-if="op.operateWithKey"
          @click="()=>op.event(selectKeys)"
          :type="op.operateType||'info'"
          :disabled="selectKeys.length===0">
          {{op.operateName}}
        </n-button>
        <n-button
          v-else
          @click="()=>op.event()"
          :type="op.operateType||'info'">
          {{op.operateName}}
        </n-button>
      </template>
    </n-space>
  </div>
  <n-data-table
  :columns="props.columns"
  :data="props.data"
  :row-key="(row)=>row.id"
  @update-checked-row-keys="handleSelect"
  ></n-data-table>
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
  withDefaults, defineProps, computed, defineEmits, ref, watch,
} from 'vue';
import {
  NDataTable, DataTableColumns, NPagination, NSpace,
  NButton,
} from 'naive-ui';

export type BtnType = 'default' | 'tertiary' | 'primary' | 'info' | 'success' | 'warning' | 'error'
export interface Operate{
  permissionCode: string,
  operateName:string,
  operateWithKey?: boolean,
  operateType?: BtnType,
  event:(keys?:string[])=>void
}

const props = withDefaults(defineProps<{
  columns: DataTableColumns<any>,
  data: Record<string, any>[],
  total: number,
  page: number,
  limit: number,
  pageSizes?: number[],
  operates?: Operate[]
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

const pageSizes = computed(() => props.pageSizes.map((size) => ({ label: `${size}/页`, value: size })));

const selectKeys = ref([]);
watch(props.data, () => {
  selectKeys.value = [];
});
const handleSelect = (rowKeys:any) => {
  selectKeys.value = rowKeys;
};
</script>
<style module lang="scss">
.header-operate{
  margin: 10px 0;
}
</style>
