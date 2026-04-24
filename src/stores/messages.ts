import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { type ChatMessageData, createChatMessage, fetchChatMessages } from '@/api/chat.ts'

type MessagesEntry = {
  messages: ChatMessageData[]
  error?: string
  isLoading?: boolean
}

export const useMessagesStore = defineStore('messages', () => {
  const messages = reactive(new Map<string, MessagesEntry>())

  async function loadMessages(chatId: string) {
    if (!messages.has(chatId)) {
      messages.set(chatId, { messages: [] })
    }

    const entry = messages.get(chatId)!

    if (entry.isLoading) return

    entry.isLoading = true
    entry.error = undefined

    try {
      entry.messages = await fetchChatMessages(chatId)
    } catch (e) {
      if (e instanceof Error) {
        entry.error = e.message
        return
      }
      throw e
    } finally {
      entry.isLoading = false
    }
  }

  async function sendMessage(chatId: string, content: string, sender = 'You') {
    if (!messages.has(chatId)) {
      messages.set(chatId, { messages: [] })
    }

    const entry = messages.get(chatId)!

    if (entry.isLoading) return
    const message = await createChatMessage(chatId, { content, sender })
    entry.messages = [...entry.messages, message]
  }

  function getMessages(chatId: string) {
    return messages.get(chatId)?.messages ?? []
  }

  function getError(chatId: string) {
    return messages.get(chatId)?.error
  }

  function isLoading(chatId: string) {
    return messages.get(chatId)?.isLoading ?? false
  }

  return { messages, loadMessages, sendMessage, getMessages, getError, isLoading }
})
