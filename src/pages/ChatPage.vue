<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@nuxt/ui/composables'
import ChatBox from '@/features/chat/ChatBox.vue'
import ChatSkeleton from '@/features/chat/ChatSkeleton.vue'
import { provideChatMessages } from '@/features/chat/useChatMessages.ts'

const { chatId } = defineProps<{ chatId: string }>()

const router = useRouter()
const toast = useToast()

const { isLoading, error } = provideChatMessages(() => chatId)

watch(error, (error) => {
  if (!error) return
  toast.add({
    title: error,
    icon: 'i-lucide-circle-alert',
    color: 'error',
  })
  router.replace('/')
})
</script>

<template>
  <div class="p-4 flex-1 flex flex-col">
    <ChatSkeleton v-if="isLoading" />
    <ChatBox v-else class="flex-1" />
  </div>
</template>
