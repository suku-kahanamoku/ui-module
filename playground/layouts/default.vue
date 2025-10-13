<script setup lang="ts">
const localePath = useLocalePath();

const menuItems = [
  {
    label: "$.navbar.about",
    to: "/#about",
  },
  {
    label: "$.navbar.contact",
    to: "/#contact",
  },
];
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <CmpHeader />

    <main>
      <slot></slot>
    </main>

    <CmpFooter url="https://www.prasentace.cz/" name="PRASENTACE" />
  </div>
</template>
