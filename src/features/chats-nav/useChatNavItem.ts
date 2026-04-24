import type { NavigationMenuItem } from '@nuxt/ui'
import type { ChatData } from '@/api/chats.ts'
import { useCurrentChatStore } from '@/stores/current-chat.ts'

export function useChatNavItem() {
  const currentChatStore = useCurrentChatStore()

  function toChatItem(chat: ChatData) {
    return {
      chat,
      label: chat.name,
      icon: 'i-lucide-message-circle',
      href: `/chat/${chat.id}`,
      active: chat.id === currentChatStore.chatId,
    } satisfies NavigationMenuItem
  }

  return { toChatItem }
}
