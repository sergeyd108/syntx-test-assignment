<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/layout/AppHeader.vue'
import AppSidebar from '@/layout/AppSidebar.vue'

const open = ref(true)
</script>

<template>
  <div class="flex flex-col flex-1">
    <AppHeader v-model="open" />

    <div class="flex flex-1 min-h-0">
      <AppSidebar v-model="open" />

      <UMain class="flex flex-col w-full">
        <slot />
      </UMain>
    </div>
  </div>
</template>
