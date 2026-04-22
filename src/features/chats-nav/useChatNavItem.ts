import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { NavigationMenuItem } from '@nuxt/ui'
import type { ChatData } from '@/api/chats.ts'

export function useChatNavItem() {
  const route = useRoute()
  const currentChatId = computed(() => route.params.chatId as string)

  function toChatItem(chat: ChatData) {
    return {
      chat,
      label: chat.name,
      icon: 'i-lucide-message-circle',
      href: `/chats/${chat.id}`,
      active: chat.id === currentChatId.value,
    } satisfies NavigationMenuItem
  }

  return { currentChatId, toChatItem }
}
