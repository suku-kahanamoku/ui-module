<script setup lang="ts">
import { capitalize } from "vue";
import { useRoute, useLang, computed, useLocalePath } from "#imports";

const route = useRoute();
const { lang } = useLang();
const localePath = useLocalePath();
</script>

<template>
  <div class="flex">
    <div class="bg-primary w-[700px]">neco</div>
  </div>
</template>
