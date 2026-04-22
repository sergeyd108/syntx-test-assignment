import { chatsData } from '@/api/data/chats.ts'
import { delay } from '@/utils/promise.ts'

export type ChatData = {
  id: string
  name: string
  pinned: boolean
}

export type ChatCreateData = {
  name: string
}

let chatsDb: ChatData[] = []

export async function chatExists(id: string) {
  await delay(100)

  if (!chatsDb.length) {
    chatsDb = structuredClone(chatsData)
  }

  return chatsDb.some((chat) => chat.id === id)
}

export async function fetchChats() {
  await delay(800)

  if (!chatsDb.length) {
    chatsDb = structuredClone(chatsData)
  }

  return chatsDb
}

export async function createChat(data: ChatCreateData) {
  await delay(500)

  const chat = { id: crypto.randomUUID(), name: data.name, pinned: false }
  chatsDb = [...chatsDb, chat]

  return structuredClone(chat)
}

export async function toggleChatPin(id: string, value: boolean) {
  await delay(200)

  const chat = chatsDb.find((chat) => chat.id === id)
  if (!chat) return

  chat.pinned = value

  return structuredClone(chat)
}
