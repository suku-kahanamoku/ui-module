<script setup lang="ts">
import { h, resolveComponent, nextTick } from "vue";
import type { TableColumn } from "@nuxt/ui";

import type { IFormConfig } from "@/modules/form-module/runtime/types";
import type { IItem } from "@suku-kahanamoku/common-module/types";

const UCheckbox = resolveComponent("UCheckbox");
const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const props = defineProps<{
  config: IFormConfig;
  data?: IItem[];
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: "delete", value: IItem): void;
}>();

const selected = defineModel("selected");

const { t } = useLang();
const tableEl = useTemplateRef("tableEl");
const selection = ref({});

const columns = computed<TableColumn<IItem>[]>(() => {
  const result: TableColumn<IItem>[] =
    props.config?.fields?.map((f) => ({
      accessorKey: f.name,
      header: t(f.label!),
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
                !["select", "actions"].includes(column.id)
            )
            .map((column) => ({
              label: t(
                props.config.fields?.find((f) => f.name === column.id)?.label!
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
          })
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
  redirCol.cell = ({ row }) =>
    h(UButton, {
      to: row.original.gen_data?.url,
      color: "link",
      variant: "link",
      label: row.original.name,
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

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="
          (tableEl?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="tableEl?.tableApi?.getState().pagination.pageSize"
        :total="tableEl?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => tableEl?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
