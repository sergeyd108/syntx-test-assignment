import { chatsData } from '@/api/data/chats.ts'
import { delay } from '@/utils/promise.ts'

export type ChatData = {
  id: string
  name: string
}

export type ChatCreateData = {
  name: string
}

let chatsDb: ChatData[] = []

export async function fetchChats() {
  await delay(800)

  if (!chatsDb.length) {
    chatsDb = structuredClone(chatsData)
  }

  return chatsDb
}

export async function createChat(data: ChatCreateData) {
  await delay(500)

  const chat = { id: crypto.randomUUID(), name: data.name }
  chatsDb = [...chatsDb, chat]

  return structuredClone(chat)
}
