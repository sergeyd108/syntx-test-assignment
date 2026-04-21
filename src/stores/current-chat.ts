import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { chatMessagesData } from '@/data/messages.ts'

export type ChatMessageDto = {
  id: string
  content: string
  sender: string
  time: string
}

export const useCurrentChatStore = defineStore('current-chat', () => {
  const currentChatId = ref('')
  const messages = shallowRef<ChatMessageDto[]>([])
  const isLoading = ref(false)
  const isSending = ref(false)

  async function loadChat(chatId: string) {
    if (isLoading.value) return
    isLoading.value = true

    currentChatId.value = chatId
    messages.value = []

    // simulate async loading
    await new Promise((resolve) => setTimeout(resolve, 1000))

    messages.value = chatMessagesData.get(chatId) ?? []

    isLoading.value = false
  }

  async function sendMessage(content: string) {
    if (isLoading.value || isSending.value) return
    isSending.value = true

    // simulate async loading
    await new Promise((resolve) => setTimeout(resolve, 500))

    const message = {
      id: crypto.randomUUID(),
      content,
      sender: 'You',
      time: new Date().toLocaleTimeString(),
    } satisfies ChatMessageDto

    messages.value = [...messages.value, message]

    isSending.value = false
  }

  return { currentChatId, messages, isLoading, isSending, loadChat, sendMessage }
})
