<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { IPagination } from "@suku-kahanamoku/common-module/types";

const props = defineProps<{
  /**
   * @description Konfigurace stránkování
   */
  config: IPagination;
}>();

const emits = defineEmits(["page:change", "limit:change"]);

/**
 * @description Vypočítá dostupné intervaly pro stránkování
 */
const intervals = computed(() => {
  const result = [];
  if (props.config?.interval) {
    let i = 0;
    while (i < props.config?.interval * 5) {
      i += props.config?.interval;
      result?.push({ label: i, value: i });
    }
    result?.push({ label: i * 2, value: i * 2 });
    result?.push({ label: 500, value: 500 });
  }
  return result;
});

const interval = computed(() =>
  intervals.value.find((i) => i.value === props.config?.limit)
);

const selected = ref(interval.value || intervals.value[0]);

const page = ref(props.config?.page || 1);

watch(
  () => props.config?.page,
  (value) => (page.value = value || 1)
);

watch(
  () => props.config?.limit,
  () => (selected.value = interval.value || intervals.value[0])
);
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- Výběr intervalu -->
    <div class="flex items-center" data-testid="pagination-interval">
      <span class="px-2 text-gray-600 dark:text-gray-400 text-sm">
        {{ $tt("$.info.rows_per_page") }}
      </span>

      <USelectMenu
        v-model="selected"
        :options="intervals"
        @update:model-value="emits('limit:change', $event.value)"
      />
    </div>

    <!-- Stránky -->
    <div data-testid="pagination-pages">
      <UPagination
        v-model:model-value="page"
        :page-count="config?.limit"
        :total="(config?.total || config?.limit)!"
        @update:model-value="emits('page:change', $event)"
      />
    </div>
  </div>
</template>
