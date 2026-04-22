<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/layout/AppHeader.vue'
import AppSidebar from '@/layout/AppSidebar.vue'

const route = useRoute()
const mobileQuery = window.matchMedia('(max-width: 1023px)')

const open = ref(true)

watch(
  () => route.fullPath,
  () => {
    if (mobileQuery?.matches) open.value = false
  },
)
</script>

<template>
  <div class="flex flex-col flex-1">
    <AppHeader v-model="open" />

    <div class="flex flex-1">
      <AppSidebar v-model="open" />

      <UMain class="flex flex-col w-full">
        <slot />
      </UMain>
    </div>
  </div>
</template>
