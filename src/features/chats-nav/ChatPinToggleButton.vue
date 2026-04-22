<script setup lang="ts">
import type { ChatData } from '@/api/chats.ts'
import { useChatsStore } from '@/stores/chats.ts'

const { chat } = defineProps<{ chat: ChatData }>()

const chatsStore = useChatsStore()

function pinChat() {
  chatsStore.togglePin(chat.id, !chat.pinned)
}
</script>

<template>
  <UButton
    :icon="chat.pinned ? 'i-lucide-pin-off' : 'i-lucide-pin'"
    :aria-label="chat.pinned ? 'Unpin chat' : 'Pin chat'"
    color="neutral"
    variant="ghost"
    size="xs"
    @click.stop.prevent="pinChat"
  />
</template>
