<script setup lang="ts">
import ChatBox from '@/features/chat/ChatBox.vue'
import ChatSkeleton from '@/features/chat/ChatSkeleton.vue'
import { provideChatMessages } from '@/features/chat/useChatMessages.ts'

const { chatId } = defineProps<{ chatId: string }>()

const { isLoading } = provideChatMessages(() => chatId)
</script>

<template>
  <div class="p-4 flex-1 flex flex-col">
    <ChatSkeleton v-if="isLoading" />
    <ChatBox v-else class="flex-1" />
  </div>
</template>
