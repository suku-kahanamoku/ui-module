<template>
  <div class="space-y-4 p-4">
    <div class="space-x-2">
      <UButton>Default</UButton>
      <UButton disabled>Disabled</UButton>
    </div>
    <div class="space-y-2 mt-6">
      <div>Sizes</div>
      <div class="space-x-2">
        <UButton size="xs">XS</UButton>
        <UButton size="sm">SM</UButton>
        <UButton size="md">MD</UButton>
        <UButton size="lg">LG</UButton>
        <UButton size="xl">XL</UButton>
      </div>
      <div>Icon only</div>
      <div class="space-x-2">
        <UButton
          icon="i-lucide-search"
          size="md"
          color="primary"
          variant="solid"
        />
        <UButton
          icon="i-lucide-search"
          size="md"
          color="secondary"
          variant="outline"
        />
        <UButton
          icon="i-lucide-search"
          size="md"
          color="success"
          variant="soft"
        />
        <UButton
          icon="i-lucide-search"
          size="md"
          color="warning"
          variant="subtle"
        />
        <UButton
          icon="i-lucide-search"
          size="md"
          color="error"
          variant="ghost"
        />
      </div>
      <div>Icon with label</div>
      <div class="space-x-2">
        <UButton icon="i-lucide-search" size="md" color="primary"
          >Search</UButton
        >
        <UButton icon="i-lucide-rocket" size="md" color="success"
          >Rocket</UButton
        >
        <UButton icon="i-lucide-user" size="md" color="secondary">User</UButton>
      </div>
    </div>
    <div class="space-y-2">
      <div>Solid variant</div>
      <div class="space-x-2">
        <UButton color="primary" variant="solid">Primary</UButton>
        <UButton color="secondary" variant="solid">Secondary</UButton>
        <UButton color="success" variant="solid">Success</UButton>
        <UButton color="warning" variant="solid">Warning</UButton>
        <UButton color="error" variant="solid">Error</UButton>
        <UButton color="neutral" variant="solid">Neutral</UButton>
      </div>
      <div>Outline variant</div>
      <div class="space-x-2">
        <UButton color="primary" variant="outline">Primary</UButton>
        <UButton color="secondary" variant="outline">Secondary</UButton>
        <UButton color="success" variant="outline">Success</UButton>
        <UButton color="warning" variant="outline">Warning</UButton>
        <UButton color="error" variant="outline">Error</UButton>
        <UButton color="neutral" variant="outline">Neutral</UButton>
      </div>
      <div>Soft variant</div>
      <div class="space-x-2">
        <UButton color="primary" variant="soft">Primary</UButton>
        <UButton color="secondary" variant="soft">Secondary</UButton>
        <UButton color="success" variant="soft">Success</UButton>
        <UButton color="warning" variant="soft">Warning</UButton>
        <UButton color="error" variant="soft">Error</UButton>
        <UButton color="neutral" variant="soft">Neutral</UButton>
      </div>
      <div>Subtle variant</div>
      <div class="space-x-2">
        <UButton color="primary" variant="subtle">Primary</UButton>
        <UButton color="secondary" variant="subtle">Secondary</UButton>
        <UButton color="success" variant="subtle">Success</UButton>
        <UButton color="warning" variant="subtle">Warning</UButton>
        <UButton color="error" variant="subtle">Error</UButton>
        <UButton color="neutral" variant="subtle">Neutral</UButton>
      </div>
      <div>Ghost variant</div>
      <div class="space-x-2">
        <UButton color="primary" variant="ghost">Primary</UButton>
        <UButton color="secondary" variant="ghost">Secondary</UButton>
        <UButton color="success" variant="ghost">Success</UButton>
        <UButton color="warning" variant="ghost">Warning</UButton>
        <UButton color="error" variant="ghost">Error</UButton>
        <UButton color="neutral" variant="ghost">Neutral</UButton>
      </div>
      <div>Link variant</div>
      <div class="space-x-2">
        <UButton color="primary" variant="link">Primary</UButton>
        <UButton color="secondary" variant="link">Secondary</UButton>
        <UButton color="success" variant="link">Success</UButton>
        <UButton color="warning" variant="link">Warning</UButton>
        <UButton color="error" variant="link">Error</UButton>
        <UButton color="neutral" variant="link">Neutral</UButton>
      </div>
    </div>
  </div>
</template>
