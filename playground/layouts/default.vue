<script setup lang="ts"></script>

<template>
  <div class="min-h-screen flex flex-col">
    <CmpHeader />

    <main>
      <slot></slot>
    </main>

    <CmpFooter url="https://www.prasentace.cz/" name="PRASENTACE" />
  </div>
</template>
