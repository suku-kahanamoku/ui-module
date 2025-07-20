<template>
  <CmpBreadcrumb />
  <div>Nuxt module playground!</div>
  <div>
    {{ localePath("/") }}
  </div>
  <CmpFooter />
  <CmpCookieBanner />
</template>

<script setup>
import { CmpBreadcrumb, CmpCookieBanner, CmpFooter } from "#components";

const localePath = useLocalePath();
</script>
