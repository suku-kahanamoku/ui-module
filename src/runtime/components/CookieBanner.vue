<script setup lang="ts">
import { ref, useCookie } from "#imports";

const expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);

const control = useCookie("_cookies", { expires });
const isOpen = ref(control.value ? false : true);
</script>

<template>
  <!-- Cookie banner -->
  <div v-if="isOpen" class="fixed bottom-0 w-full bg-gray-800 text-white p-4">
    <div
      class="max-w-screen-lg mx-auto flex items-center justify-between gap-4"
    >
      <!-- Ikona cookie -->
      <div class="inline">
        <Icon name="mdi:cookie" size="36" class="text-primary-400" />
      </div>
      <!-- Text cookie banneru -->
      <p class="text-sm pe-4">
        {{ $tt("$.footer.cookies") }}
      </p>
      <!-- Tlačítko pro zavření -->
      <UButton
        data-testid="cookie-banner-close"
        color="secondary"
        @click="
          control = '1';
          isOpen = false;
        "
      >
        {{ $tt("$.btn.close") }}
      </UButton>
    </div>
  </div>
</template>
