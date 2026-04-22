import { chatMessagesData } from '@/api/data/messages.ts'
import { chatExists } from '@/api/chats.ts'
import { delay } from '@/utils/promise.ts'

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
  await delay(800)

  if (!(await chatExists(chatId))) {
    throw new Error(`Chat with ID ${chatId} not found.`)
  }

  if (!messagesDb.has(chatId)) {
    messagesDb.set(chatId, chatMessagesData.get(chatId) ?? [])
  }

  return structuredClone(messagesDb.get(chatId) ?? [])
}

export async function createChatMessage(chatId: string, data: ChatMessageCreateData) {
  await delay(500)

  if (!messagesDb.has(chatId)) {
    messagesDb.set(chatId, [])
  }

  const message = { ...data, id: crypto.randomUUID(), time: getCurrentTime() }
  messagesDb.get(chatId)?.push(message)

  return structuredClone(message)
}

function getCurrentTime() {
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return timeFormatter.format(new Date())
}
