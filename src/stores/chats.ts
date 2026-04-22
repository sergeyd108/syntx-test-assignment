import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { type ChatData, createChat, fetchChats } from '@/api/chats.ts'

export const useChatsStore = defineStore('chats', () => {
  const chats = shallowRef<ChatData[]>([])
  const isLoading = ref(false)

  async function loadChats() {
    if (isLoading.value) return
    isLoading.value = true

    try {
      chats.value = await fetchChats()
    } finally {
      isLoading.value = false
    }
  }

  async function addNewChat(name: string) {
    const chat = await createChat({ name })
    chats.value = [...chats.value, chat]
    return chat
  }

  return { chats, isLoading, loadChats, addNewChat }
})
