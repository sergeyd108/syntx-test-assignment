import { ref } from 'vue'
import { defineStore } from 'pinia'
import { chatsData } from '@/data/chats.ts'

export type ChatDto = {
  id: string
  name: string
}

export const useChatsStore = defineStore('chats', () => {
  const chats = ref(chatsData)

  return { chats }
})
