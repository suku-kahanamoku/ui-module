<script setup lang="ts">
import { capitalize } from "vue";
import { useRoute, useLang, computed, useLocalePath } from "#imports";

const route = useRoute();
const { lang } = useLang();
const localePath = useLocalePath();

const items = computed(() => {
  const segments = route.path
    .split("/")
    .filter((segment) => segment !== lang.value.code)
    .filter(Boolean);

  return segments.map((segment, index) => {
    let label = segment;
    // Z labelu odstraní ID
    if (route.meta.id) {
      label = label.replace(`--$${route.meta.id}`, "");
    }
    // Z labelu odstraní subID
    if (route.meta.subid) {
      label = label.replace(`--$${route.meta.subid}`, "");
    }
    // Z labelu odstraní subID2
    if (route.meta.subid2) {
      label = label.replace(`--$${route.meta.subid2}`, "");
    }
    // Z labelu odstraní subID3
    if (route.meta.subid3) {
      label = label.replace(`--$${route.meta.subid3}`, "");
    }

    const result = {
      label: capitalize(decodeURIComponent(label)),
      to: localePath(`/${segments.slice(0, index + 1).join("/")}`),
      icon: "",
    };

    // Pokud je to první segment, vrátí místo labelu ikonu s domečkem
    if (index === 0) {
      result.label = "";
      result.icon = "i-heroicons-home";
    }

    return result;
  });
});
</script>

<template>
  <!-- Breadcrumb navigace -->
  <UBreadcrumb :links="items" />
</template>
