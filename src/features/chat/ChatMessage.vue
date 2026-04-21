<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  content: string
  sender: string
  time: string
}

const props = defineProps<Props>()

const isOwn = computed(() => props.sender === 'You')

const initials = computed(() => {
  return props.sender
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
})
</script>

<template>
  <div class="flex items-end gap-2" :class="isOwn ? 'flex-row-reverse' : 'flex-row'">
    <UAvatar v-if="!isOwn" size="sm" :alt="sender" :text="initials" class="shrink-0" />

    <div
      class="flex flex-col gap-1 px-3.5 py-2 max-w-3/4 shadow-sm"
      :class="
        isOwn
          ? 'items-end bg-secondary text-inverted rounded-2xl rounded-br-sm'
          : 'items-start bg-elevated text-highlighted rounded-2xl rounded-bl-sm'
      "
    >
      <div v-if="!isOwn" class="text-xs font-semibold text-primary">{{ sender }}</div>
      <p class="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">{{ content }}</p>
      <time class="text-xs leading-none" :class="isOwn ? 'text-inverted/70' : 'text-dimmed'">{{ time }}</time>
    </div>
  </div>
</template>
