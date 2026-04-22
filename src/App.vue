<script setup lang="ts">
import AppLayout from '@/layout/AppLayout.vue'
import { useChatsStore } from '@/stores/chats.ts'

useChatsStore().loadChats()
</script>

<template>
  <UApp>
    <AppLayout>
      <RouterView />
    </AppLayout>
  </UApp>
</template>
