import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import { useChatsStore } from '@/stores/chats.ts'
import { useMessagesStore } from '@/stores/messages.ts'

export const useCurrentChatStore = defineStore('current-chat', () => {
  const route = useRoute()
  const chatsStore = useChatsStore()
  const messagesStore = useMessagesStore()

  const chatId = computed(() => route.params.chatId as string | undefined)
  const chat = computed(() => chatsStore.chats.find((chat) => chat.id === chatId.value))
  const messages = computed(() => (chatId.value ? messagesStore.getMessages(chatId.value) : []))
  const error = computed(() => (chatId.value ? messagesStore.getError(chatId.value) : undefined))
  const isLoading = computed(() => (chatId.value ? messagesStore.isLoading(chatId.value) : false))

  watch(chatId, loadMessages, { immediate: true })

  function loadMessages() {
    if (chatId.value) {
      return messagesStore.loadMessages(chatId.value)
    }
  }

  function sendMessage(content: string, sender = 'You') {
    if (chatId.value) {
      return messagesStore.sendMessage(chatId.value, content, sender)
    }
  }

  return { chatId, chat, messages, error, isLoading, loadMessages, sendMessage }
})
