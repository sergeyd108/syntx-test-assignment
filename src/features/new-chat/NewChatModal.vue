<script setup lang="ts">
import NewChatForm from '@/features/new-chat/NewChatForm.vue'

defineProps<{ compact?: boolean }>()
defineEmits<{ created: [id: string] }>()
</script>

<template>
  <UModal title="Create new Chat">
    <template #body="{ close }">
      <NewChatForm @created="[$emit('created', $event), close()]" @cancel="close" />
    </template>

    <UButton label="New chat" icon="i-lucide-plus" color="primary" :ui="{ label: compact && 'hidden' }" block />
  </UModal>
</template>
