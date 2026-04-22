<script setup lang="ts">
import NewChatModal from '@/features/new-chat/NewChatModal.vue'
</script>

<template>
  <div class="flex flex-1 items-center justify-center p-6">
    <div class="flex flex-col items-center text-center gap-6 max-w-md">
      <UIcon name="i-lucide-messages-square" class="size-14 text-primary" />

      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-semibold">Welcome!</h1>
        <p class="text-muted">Pick a chat from the sidebar to jump back in, or start a new conversation below.</p>
      </div>

      <NewChatModal @created="$router.push(`/chats/${$event}`)">
        <UButton label="Start a new chat" icon="i-lucide-plus" color="primary" size="xl" />
      </NewChatModal>
    </div>
  </div>
</template>
