<script setup lang="ts">
import ChatInput from '@/features/chat/ChatInput.vue'
import ChatMessages from '@/features/chat/ChatMessages.vue'
import { provideBotResponse } from '@/features/chat/useBotResponse.ts'

provideBotResponse()
</script>

<template>
  <div class="flex flex-col flex-1">
    <div class="flex-1 px-4">
      <div class="mx-auto w-full max-w-3xl">
        <ChatMessages />
      </div>
    </div>
    <div class="sticky bottom-0 px-4 pt-3 pb-4 bg-default/80 backdrop-blur-sm">
      <div class="mx-auto w-full max-w-3xl">
        <ChatInput />
      </div>
    </div>
  </div>
</template>
