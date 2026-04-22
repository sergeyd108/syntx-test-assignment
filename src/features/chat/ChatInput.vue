<script setup lang="ts">
import { nextTick, reactive, useTemplateRef } from 'vue'
import type { Form, FormSubmitEvent } from '@nuxt/ui'
import { scrollToBottom } from '@/utils/dom.ts'
import { useChatMessages } from '@/features/chat/useChatMessages.ts'

type Schema = typeof state

const { sendMessage, isSending } = useChatMessages()

const state = reactive({ content: '' })
const form = useTemplateRef<Form<Schema>>('form')

async function onSubmit({ data }: FormSubmitEvent<Schema>) {
  await sendMessage(data.content)
  state.content = ''
  await nextTick()
  scrollToBottom()
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
      :disabled="!state.content"
      :loading="isSending"
      class="-translate-y-1/4"
    />
  </UForm>
</template>
