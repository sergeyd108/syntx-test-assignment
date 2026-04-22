<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { NavigationMenuItem } from '@nuxt/ui'
import { useChatsStore } from '@/stores/chats.ts'
import NewChatModal from '../features/new-chat/NewChatModal.vue'

const open = defineModel<boolean>()

const route = useRoute()
const chatsStore = useChatsStore()

// this should be runtime validated, but OK for demo
const currentChatId = computed(() => route.params.chatId as string)

const items = computed(() => {
  return chatsStore.chats.map(
    (chat) =>
      ({
        label: chat.name,
        icon: 'i-lucide-message-circle',
        href: `/chats/${chat.id}`,
        active: chat.id === currentChatId.value,
      }) satisfies NavigationMenuItem,
  )
})
</script>

<template>
  <USidebar
    v-model:open="open"
    collapsible="icon"
    :ui="{ container: 'sticky top-(--ui-header-height) h-[calc(100dvh-var(--ui-header-height))]' }"
  >
    <template #header>
      <NewChatModal @created="$router.push(`/chats/${$event}`)" />
    </template>

    <UNavigationMenu :items orientation="vertical" :ui="{ link: 'p-1.5 overflow-hidden' }" />
  </USidebar>
</template>
