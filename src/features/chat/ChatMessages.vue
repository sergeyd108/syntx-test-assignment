<script setup lang="ts">
import ChatMessage from '@/features/chat/ChatMessage.vue'
import { useChatMessages } from '@/features/chat/useChatMessages.ts'

const { messages } = useChatMessages()
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <ChatMessage v-for="message in messages" :key="message.id" v-bind="message" />
  </div>
</template>
