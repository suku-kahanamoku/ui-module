<template>
  <div class="space-y-4 p-4">
    <UAlert title="Default alert" />
    <UAlert color="primary" title="Primary alert" />
    <UAlert color="info" title="Info alert" />
    <UAlert color="success" title="Success alert" />
    <UAlert color="warning" title="Warning alert" />
    <UAlert color="error" title="Error alert" />
    <UAlert icon="i-lucide-info" color="info" title="With icon" />
    <UAlert color="success" title="With description">
      <template #description>
        This is a success alert with a description slot.
      </template>
    </UAlert>
    <UAlert color="warning" title="Closable" closable />
  </div>
</template>
