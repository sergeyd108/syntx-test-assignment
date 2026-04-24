<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@nuxt/ui/composables'
import ChatBox from '@/features/chat/ChatBox.vue'
import ChatSkeleton from '@/features/chat/ChatSkeleton.vue'
import { useCurrentChatStore } from '@/stores/current-chat.ts'

const router = useRouter()
const toast = useToast()

const currentChatStore = useCurrentChatStore()

watch(
  () => currentChatStore.error,
  (error) => {
    if (!error) return
    toast.add({
      title: error,
      icon: 'i-lucide-circle-alert',
      color: 'error',
    })
    router.replace('/')
  },
)
</script>

<template>
  <div class="p-4 flex-1 flex flex-col">
    <ChatSkeleton v-if="currentChatStore.isLoading" />
    <ChatBox v-else class="flex-1" />
  </div>
</template>
