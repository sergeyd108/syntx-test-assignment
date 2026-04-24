import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { computed, ref, shallowRef, watch } from 'vue'
import { useChatsStore } from '@/stores/chats.ts'
import { type ChatMessageData, createChatMessage, fetchChatMessages } from '@/api/chat.ts'

export const useCurrentChatStore = defineStore('current-chat', () => {
  const route = useRoute()
  const chatsStore = useChatsStore()

  const messages = shallowRef<ChatMessageData[]>([])
  const error = ref<string>()
  const isLoading = ref(false)

  const chatId = computed(() => route.params.chatId as string | undefined)
  const chat = computed(() => chatsStore.chats.find((chat) => chat.id === chatId.value))

  watch(chatId, loadMessages, { immediate: true })
  watch(chatId, (chatId) => {
    if (!chatId) {
      messages.value = []
      error.value = undefined
      isLoading.value = false
    }
  })

  async function loadMessages() {
    if (!chatId.value || isLoading.value) return

    isLoading.value = true
    error.value = undefined
    messages.value = []

    try {
      messages.value = await fetchChatMessages(chatId.value)
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
        return
      }
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function sendMessage(content: string, sender = 'You') {
    if (!chatId.value || isLoading.value) return

    const message = await createChatMessage(chatId.value, { content, sender })
    messages.value = [...messages.value, message]
  }

  return { chatId, chat, messages, error, isLoading, loadMessages, sendMessage }
})
