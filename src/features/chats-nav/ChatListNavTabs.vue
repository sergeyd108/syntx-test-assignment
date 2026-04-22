<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TabsItem } from '@nuxt/ui'
import { provideCompactView } from '@/features/chats-nav/useCompactView.ts'
import ChatListAll from '@/features/chats-nav/ChatListAll.vue'
import ChatListPinned from '@/features/chats-nav/ChatListPinned.vue'

type TabKey = (typeof items)[number]['value']

const { compact } = defineProps<{ compact?: boolean }>()

provideCompactView(() => compact)

const items = [
  { label: 'All', value: 'all', icon: 'i-lucide-list' },
  { label: 'Pinned', value: 'pinned', icon: 'i-lucide-pin' },
] as const satisfies TabsItem[]

const activeTab = ref<TabKey>('all')

const activeComponent = computed(() => {
  switch (activeTab.value) {
    case 'all':
      return ChatListAll
    case 'pinned':
      return ChatListPinned
    default:
      // exhaustiveness check
      return activeTab.value satisfies never
  }
})
</script>

<template>
  <ChatListAll v-if="compact" />
  <template v-else>
    <UTabs
      v-model="activeTab"
      :items
      :content="false"
      variant="link"
      size="sm"
      :ui="{ trigger: 'flex-1' }"
      class="px-2 pt-2"
    />
    <component :is="activeComponent" />
  </template>
</template>
