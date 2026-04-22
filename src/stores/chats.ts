import { computed, ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { type ChatData, createChat, fetchChats, toggleChatPin } from '@/api/chats.ts'

export const useChatsStore = defineStore('chats', () => {
  const chats = shallowRef<ChatData[]>([])
  const pinnedChats = computed(() => chats.value.filter((chat) => chat.pinned))
  const notPinnedChats = computed(() => chats.value.filter((chat) => !chat.pinned))
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

  async function togglePin(id: string, value: boolean) {
    const chat = await toggleChatPin(id, value)
    const index = chats.value.findIndex(({ id }) => id === chat?.id)

    if (!chat || index === -1) return

    const newChats = [...chats.value]
    newChats.splice(index, 1, chat)
    chats.value = newChats
  }

  return { chats, pinnedChats, notPinnedChats, isLoading, loadChats, addNewChat, togglePin }
})
