<script setup lang="ts">
import type { ModalProps } from "#ui/types";

import type { IBtn } from "../types/cmp.interface";

defineProps<
  {
    /**
     * @description Akce pro tlačítka dialogu
     */
    actions?: {
      yes?: IBtn;
      no?: IBtn;
    };
  } & /* @vue-ignore */ ModalProps
>();

const emits = defineEmits<{
  (e: "confirm", value: boolean): void;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <!-- Dialogové okno -->
  <UModal
    v-model:open="model"
    close-icon="i-heroicons-x-mark"
    :ui="{ footer: 'w-full justify-between' }"
  >
    <!-- Obsah dialogu -->
    <template #body>
      <slot />
    </template>

    <!-- Patička dialogu -->
    <template #footer>
      <!-- Tlačítko "Ne" -->
      <UButton
        data-testid="dialog-no"
        :label="$tt(actions?.no?.label || '$.btn.cancel')"
        :color="actions?.no?.color"
        :variant="actions?.no?.variant || 'ghost'"
        :size="actions?.no?.size"
        @click="model = false"
      />

      <!-- Tlačítko "Ano" -->
      <UButton
        data-testid="dialog-yes"
        :label="$tt(actions?.yes?.label || '$.btn.yes')"
        :color="actions?.yes?.color"
        :variant="actions?.yes?.variant || 'solid'"
        :size="actions?.yes?.size"
        @click="
          emits('confirm', true);
          model = false;
        "
      />
    </template>
  </UModal>
</template>
