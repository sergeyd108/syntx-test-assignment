<script setup lang="ts">
import NewChatForm from '@/features/new-chat/NewChatForm.vue'

defineProps<{ compact?: boolean }>()
defineEmits<{ created: [id: string] }>()
</script>

<template>
  <UModal title="Create new chat">
    <template #body="{ close }">
      <NewChatForm @created="[$emit('created', $event), close()]" @cancel="close" />
    </template>

    <slot>
      <UButton label="New chat" icon="i-lucide-plus" color="primary" :ui="{ label: compact && 'hidden' }" block />
    </slot>
  </UModal>
</template>
