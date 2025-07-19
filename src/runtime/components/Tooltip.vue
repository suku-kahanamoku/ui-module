<script setup lang="ts">
import type { PopoverProps } from "#ui/types";

defineProps<{
  /**
   * @description Možnosti pro Popper.js
   */
  popper?: PopoverProps;

  /**
   * @description Zpoždění při otevření tooltipu (v ms)
   */
  openDelay?: number;

  /**
   * @description Zpoždění při zavření tooltipu (v ms)
   */
  closeDelay?: number;

  /**
   * @description Přizpůsobení vzhledu tooltipu
   */
  ui?: Record<string, any>;
}>();
</script>

<template>
  <!-- Tooltip komponenta -->
  <UTooltip :popper="popper" :open-delay="openDelay" :close-delay="closeDelay">
    <!-- Obsah tooltipu -->
    <template #default>
      <slot />
    </template>

    <!-- Text tooltipu -->
    <template #text>
      <slot name="text" />
    </template>
  </UTooltip>
</template>
