<script setup lang="ts">
import ChatMessage from '@/features/chat/ChatMessage.vue'
import { useChatMessages } from '@/features/chat/useChatMessages.ts'
import { useBotResponse } from '@/features/chat/useBotResponse.ts'
import BotRespondingIndicator from '@/features/chat/BotRespondingIndicator.vue'

const { messages } = useChatMessages()
const { isResponding } = useBotResponse()
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <ChatMessage v-for="message in messages" :key="message.id" v-bind="message" />
    <BotRespondingIndicator v-if="isResponding" />
  </div>
</template>
