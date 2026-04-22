<script setup lang="ts">
import { watch } from 'vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import { useChatMessages } from '@/features/chat/useChatMessages.ts'
import { useBotResponse } from '@/features/chat/useBotResponse.ts'
import { scrollToBottom } from '@/utils/dom.ts'
import ChatMessage from '@/features/chat/ChatMessage.vue'
import BotRespondingIndicator from '@/features/chat/BotRespondingIndicator.vue'

const { messages } = useChatMessages()
const { isResponding } = useBotResponse()

watch(messages, scrollToBottom, { flush: 'post' })

async function onResize() {
  // first call is 'dirty' scroll to bottom
  // second call in RAF is needed, because scroll height has been recalculated
  scrollToBottom()
  requestAnimationFrame(scrollToBottom)
}
</script>

<template>
  <DynamicScroller :items="messages" :min-item-size="72" key-field="id" class="py-4" page-mode @resize.once="onResize">
    <template #default="{ item, active, index }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.content]"
        :data-index="index"
        class="pb-4"
      >
        <ChatMessage v-bind="item" />
      </DynamicScrollerItem>
    </template>
    <template #after>
      <BotRespondingIndicator v-if="isResponding" />
    </template>
  </DynamicScroller>
</template>
