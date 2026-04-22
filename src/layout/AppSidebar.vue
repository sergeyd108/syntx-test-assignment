<script setup lang="ts">
import NewChatModal from '@/features/new-chat/NewChatModal.vue'
import ChatListNavTabs from '@/features/chats-nav/ChatListNavTabs.vue'

const open = defineModel<boolean>()
</script>

<template>
  <USidebar
    v-model:open="open"
    collapsible="icon"
    :ui="{ container: 'sticky top-(--ui-header-height) h-[calc(100dvh-var(--ui-header-height))]' }"
  >
    <template #footer>
      <NewChatModal :compact="!open" @created="$router.push(`/chats/${$event}`)" />
    </template>

    <ChatListNavTabs :compact="!open" />
  </USidebar>
</template>
