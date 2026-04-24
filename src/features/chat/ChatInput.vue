<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useCurrentChatStore } from '@/stores/current-chat.ts'
import { useBotResponse } from '@/features/chat/useBotResponse.ts'

type Schema = typeof state

const form = useTemplateRef('form')
const textarea = useTemplateRef('textarea')

const { sendMessage } = useCurrentChatStore()
const { respond } = useBotResponse()

const isSending = ref(false)
const state = reactive({ content: '' })

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  if (isSending.value) return
  isSending.value = true

  try {
    await sendMessage(data.content.trim())
    state.content = ''
    void respond()
  } finally {
    isSending.value = false
    requestAnimationFrame(() => textarea.value?.textareaRef?.focus())
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    form.value?.submit()
  }
}
</script>

<template>
  <UForm ref="form" :state class="flex gap-4 items-center" @submit="onSubmit">
    <UFormField name="content" help="Press ctrl+enter to send" :ui="{ help: 'text-xs mt-1' }" class="flex-1">
      <UTextarea
        ref="textarea"
        v-model="state.content"
        :rows="2"
        :maxrows="5"
        placeholder="Type your message here..."
        class="w-full"
        autofocus
        @keydown="onKeydown"
      />
    </UFormField>
    <UButton
      type="submit"
      icon="i-lucide-send"
      color="primary"
      size="xl"
      :disabled="!state.content.trim()"
      :loading="isSending"
      class="-translate-y-1/4"
    />
  </UForm>
</template>
