<script setup lang="ts">
import AppLogo from '@/layout/AppLogo.vue'

const open = defineModel<boolean>()
</script>

<template>
  <UHeader toggle-side="left" title="" :ui="{ container: 'max-w-full px-4!' }">
    <template #toggle>
      <UButton
        icon="i-lucide-panel-left"
        color="neutral"
        variant="ghost"
        aria-label="Toggle sidebar"
        @click="open = !open"
      />
    </template>

    <template #left>
      <AppLogo />
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
