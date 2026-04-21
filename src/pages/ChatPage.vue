<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useCurrentChatStore } from '@/stores/current-chat.ts'
import ChatBox from '@/features/chat/ChatBox.vue'
import ChatSkeleton from '@/features/chat/ChatSkeleton.vue'
import { scrollToBottom } from '@/utils/dom.ts'

const { chatId } = defineProps<{ chatId: string }>()

const currentChatStore = useCurrentChatStore()

onMounted(() => {
  currentChatStore.loadChat(chatId)
})

onBeforeRouteUpdate(() => {
  currentChatStore.loadChat(chatId)
})

watch(
  () => currentChatStore.isLoading,
  (isLoading) => {
    if (!isLoading) scrollToBottom()
  },
  { flush: 'post' },
)
</script>

<template>
  <div class="p-4 flex-1 flex flex-col">
    <ChatSkeleton v-if="currentChatStore.isLoading" />
    <ChatBox v-else class="flex-1" />
  </div>
</template>
