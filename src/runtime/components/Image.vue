<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src?: string;
    defaultSrc?: string;
    alt?: string;
    loading?: "lazy" | "eager";
    format?: string;
    sizes?: string;
    quality?: number;
    width?: number | string;
    height?: number | string;
    class?: string;
  }>(),
  {
    defaultSrc: "/img/bottle.jpg",
    alt: "",
    loading: "lazy",
    format: "webp",
    sizes: "200px md:300px",
    quality: 80,
  },
);

// API URLs (napr. /api/files/...) nechceme proxovat pres IPX
const isDynamic = computed(
  () =>
    !!props.src &&
    (props.src.startsWith("/api/") || props.src.startsWith("http")),
);
</script>

<template>
  <!-- Dynamicke / API URL: nativni img, bez IPX proxy -->
  <img
    v-if="isDynamic"
    :src="src"
    :alt="alt"
    :loading="loading"
    :width="width"
    :height="height"
    :class="class"
  />
  <!-- Lokalni nebo fallback: NuxtImg s optimalizaci -->
  <NuxtImg
    v-else
    :src="src || defaultSrc"
    :alt="alt"
    :loading="loading"
    :format="format"
    :sizes="sizes"
    :quality="quality"
    :width="width"
    :height="height"
    :class="class"
  />
</template>
