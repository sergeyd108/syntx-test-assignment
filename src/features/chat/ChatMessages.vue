<script setup lang="ts">
import { useCurrentChatStore } from '@/stores/current-chat.ts'
import ChatMessage from '@/features/chat/ChatMessage.vue'

const currentChatStore = useCurrentChatStore()
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <ChatMessage v-for="message in currentChatStore.messages" :key="message.id" v-bind="message" />
  </div>
</template>
