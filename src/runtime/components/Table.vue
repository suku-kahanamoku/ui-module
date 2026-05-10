<script setup lang="ts">
import {
  h,
  resolveComponent,
  nextTick,
  computed,
  ref,
  watch,
  useTemplateRef,
} from "vue";
import { useLang } from "#imports";
import type { TableColumn } from "@nuxt/ui";

import type {
  IConfig,
  IItem,
  IPagination,
} from "@suku-kahanamoku/common-module/types";

const UCheckbox = resolveComponent("UCheckbox");
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UIcon = resolveComponent("UIcon");
const CmpField = resolveComponent("CmpField");

const props = defineProps<{
  config: IConfig;
  data?: IItem[];
  meta?: IPagination;
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: "delete", value: IItem): void;
  (e: "sort", value: Record<string, number>[]): void;
  (e: "page", page: number): void;
  (e: "filter", value: Record<string, string>): void;
}>();

const selected = defineModel("selected");

const { t } = useLang();
const tableEl = useTemplateRef("tableEl");
const selection = ref({});

/** Local filter values — synced from config.fields[].value when config changes (URL-driven). */
const filterValues = ref<Record<string, string>>({});

watch(
  () => props.config?.fields,
  (fields) => {
    fields?.forEach((f: any) => {
      const newVal = (f.value as string) ?? "";
      if (filterValues.value[f.name] !== newVal) {
        filterValues.value[f.name] = newVal;
      }
    });
  },
  { immediate: true, deep: true },
);

/** Sort state derived directly from config — always in sync, no watch needed. */
const sorting = computed<Record<string, number>[]>(
  () => (props.config?.sort as unknown as Record<string, number>[]) ?? [],
);

/** Returns the current sort direction for a field, or null if unsorted. */
function getSortDir(field: string): "asc" | "desc" | null {
  const item = sorting.value.find((s) => field in s);
  if (!item) return null;
  return item[field] === 1 ? "asc" : "desc";
}

/** Cycles sort for a field: none → asc → desc → none, then emits. */
function toggleSort(field: string) {
  const current = getSortDir(field);
  let newSort: Record<string, number>[];
  if (!current) {
    newSort = [{ [field]: 1 }];
  } else if (current === "asc") {
    newSort = [{ [field]: -1 }];
  } else {
    newSort = [];
  }
  emits("sort", newSort);
}

const columns = computed<TableColumn<IItem>[]>(() => {
  const result: TableColumn<IItem>[] =
    props.config?.fields?.map((f) => ({
      accessorKey: f.name,
      enableSorting: false,
      header: () => {
        const dir = getSortDir(f.name);
        return h("div", { class: "flex flex-col gap-1" }, [
          h(
            "div",
            {
              class: "flex items-center gap-1 cursor-pointer select-none",
              onClick: () => toggleSort(f.name),
            },
            [
              t(f.label!),
              dir
                ? h(UIcon, {
                    name:
                      dir === "asc"
                        ? "i-lucide-arrow-up"
                        : "i-lucide-arrow-down",
                    class: "w-3.5 h-3.5 shrink-0",
                  })
                : null,
            ],
          ),
          h(CmpField, {
            modelValue: filterValues.value[f.name] ?? "",
            field: { ...f, label: undefined },
            onClick: (e: MouseEvent) => e.stopPropagation(),
            "onUpdate:modelValue": (val: any) => {
              filterValues.value[f.name] = val;
              emits("filter", { ...filterValues.value });
            },
          }),
        ]);
      },
    })) ?? [];

  result.unshift({
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") => {
          table.toggleAllPageRowsSelected(!!value);
          nextTick(() => {
            selected.value = table
              .getSelectedRowModel()
              .rows.map((r) => r.original);
          });
        },
        "aria-label": "Select all",
      }),
    cell: ({ table, row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") => {
          row.toggleSelected(!!value);
          nextTick(() => {
            selected.value = table
              .getSelectedRowModel()
              .rows.map((r) => r.original);
          });
        },
        "aria-label": "Select row",
      }),
  });

  result.push({
    id: "actions",
    header: ({ table }) =>
      h(
        UDropdownMenu,
        {
          content: {
            align: "end",
          },
          items: table
            ?.getAllColumns()
            .filter(
              (column) =>
                column.getCanHide() &&
                !["select", "actions"].includes(column.id),
            )
            .map((column) => ({
              label: t(
                props.config.fields?.find((f) => f.name === column.id)?.label!,
              ),
              type: "checkbox" as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.getColumn(column.id)?.toggleVisibility(!!checked);
              },
              onSelect(e?: Event) {
                e?.preventDefault();
              },
            })),
          "aria-label": "Actions dropdown",
        },
        () =>
          h(UButton, {
            icon: "i-lucide-ellipsis-vertical",
            color: "neutral",
            variant: "ghost",
            class: "ml-auto",
            "aria-label": "Actions dropdown",
          }),
      ),
    cell: ({ row }) =>
      h(UButton, {
        icon: "i-heroicons-trash",
        color: "error",
        variant: "ghost",
        "aria-label": "Delete",
        onClick: () => {
          selected.value = [row.original];
          emits("delete", row.original);
        },
      }),
  });

  const redirCol = result[1];
  const firstFieldName = props.config?.fields?.[0]?.name || "name";
  redirCol.cell = ({ row }) =>
    h(UButton, {
      to: row.original.gen_data?.url,
      color: "link",
      variant: "link",
      label: String(row.original?.[firstFieldName] ?? ""),
    });

  return result;
});

defineExpose({ tableEl });
</script>

<template>
  <div class="flex-1 w-full">
    <UTable
      ref="tableEl"
      v-model:row-selection="selection"
      :data="props.data"
      :columns="columns"
      :loading="loading"
      :sticky="true"
    />

    <div v-if="meta" class="flex justify-center border-t border-default pt-4">
      <UPagination
        :page="config.pagination?.page ?? 1"
        :items-per-page="config.pagination?.limit ?? 20"
        :total="meta.total ?? 0"
        :show-controls="true"
        :show-edges="true"
        @update:page="(p) => emits('page', p)"
      />
    </div>
  </div>
</template>
