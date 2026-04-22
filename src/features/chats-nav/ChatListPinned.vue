<script setup lang="ts">
import { computed } from 'vue'
import { useChatsStore } from '@/stores/chats.ts'
import { useChatNavItem } from '@/features/chats-nav/useChatNavItem.ts'
import ChatPinToggleButton from '@/features/chats-nav/ChatPinToggleButton.vue'

const chatsStore = useChatsStore()
const { toChatItem } = useChatNavItem()

const items = computed(() => chatsStore.pinnedChats.map(toChatItem))
</script>

<template>
  <div v-if="!items.length" class="p-4 text-sm text-muted">No pinned chats yet.</div>
  <UNavigationMenu v-else :items orientation="vertical" :ui="{ link: 'p-1.5 overflow-hidden' }">
    <template #item-trailing="{ item }">
      <ChatPinToggleButton v-if="item.chat" :chat="item.chat" />
    </template>
  </UNavigationMenu>
</template>
