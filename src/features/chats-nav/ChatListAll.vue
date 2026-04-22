<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useChatsStore } from '@/stores/chats.ts'
import { useChatNavItem } from '@/features/chats-nav/useChatNavItem.ts'
import { useCompactView } from '@/features/chats-nav/useCompactView.ts'
import ChatPinToggleButton from '@/features/chats-nav/ChatPinToggleButton.vue'

const compact = useCompactView()

const chatsStore = useChatsStore()
const { toChatItem } = useChatNavItem()

const items = computed(() => {
  const groups: NavigationMenuItem[][] = []

  if (chatsStore.pinnedChats.length) {
    const heading = compact.value
      ? ({ type: 'label', icon: 'i-lucide-pin', class: 'px-1.5' } satisfies NavigationMenuItem)
      : ({ type: 'label', label: 'Pinned Chats' } satisfies NavigationMenuItem)
    groups.push([heading, ...chatsStore.pinnedChats.map(toChatItem)])
  }

  if (chatsStore.notPinnedChats.length) {
    const heading = compact.value
      ? ({ type: 'label', icon: 'i-lucide-list', class: 'px-1.5' } satisfies NavigationMenuItem)
      : ({
          type: 'label',
          label: chatsStore.pinnedChats.length ? 'Other Chats' : 'All Chats',
        } satisfies NavigationMenuItem)
    groups.push([heading, ...chatsStore.notPinnedChats.map(toChatItem)])
  }

  return groups
})
</script>

<template>
  <UNavigationMenu :items orientation="vertical" :ui="{ link: 'p-1.5 overflow-hidden' }">
    <template #item-trailing="{ item }">
      <ChatPinToggleButton v-if="item.chat" :chat="item.chat" />
    </template>
  </UNavigationMenu>
</template>
