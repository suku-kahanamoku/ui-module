<script setup lang="ts">
import { useLang } from "#imports";

const props = defineProps<{
  url: string;
  name: string;
}>();

const today = new Date();
const { lang } = useLang();
</script>

<template>
  <!-- Paticka aplikace -->
  <footer class="py-4 bg-gray-50 dark:bg-gray-800">
    <!-- Copyright informace -->
    <p class="text-center text-sm text-slate-600 dark:text-slate-300">
      {{ $tt("$.footer.copyright") }} © {{ today.getFullYear() }}
      <slot name="logo" />. {{ $tt("$.footer.reserved") }}.
    </p>
    <!-- Informace o autorovi -->
    <p class="text-center text-xs text-slate-600 dark:text-slate-300 mt-1">
      {{ $tt("$.footer.made_by") }}
      <a :href="url" target="_blank" rel="noopener" class="hover:underline">
        {{ name }}
      </a>
    </p>
  </footer>
</template>
