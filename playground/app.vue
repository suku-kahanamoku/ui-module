<script setup lang="ts">
import { cs } from "@nuxt/ui/locale";
const {
  i18n: { locale },
} = useLang();
</script>
<template>
  <UApp :locale="cs">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
