import { chatMessagesData } from '@/api/data/messages.ts'

export type ChatMessageData = {
  id: string
  content: string
  sender: string
  time: string
}

export type ChatMessageCreateData = {
  content: string
  sender: string
}

const messagesDb = new Map<string, ChatMessageData[]>()

export async function fetchChatMessages(chatId: string) {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (!messagesDb.has(chatId)) {
    messagesDb.set(chatId, chatMessagesData.get(chatId) ?? [])
  }

  return structuredClone(messagesDb.get(chatId) ?? [])
}

export async function createChatMessage(chatId: string, data: ChatMessageCreateData) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!messagesDb.has(chatId)) {
    messagesDb.set(chatId, [])
  }

  const message = { ...data, id: crypto.randomUUID(), time: new Date().toLocaleTimeString() }
  messagesDb.get(chatId)?.push(message)

  return structuredClone(message)
}
