<script setup lang="ts">
import { nextTick, reactive, useTemplateRef } from 'vue'
import type { Form, FormSubmitEvent } from '@nuxt/ui'
import { useCurrentChatStore } from '@/stores/current-chat.ts'
import { scrollToBottom } from '@/utils/dom.ts'

type Schema = typeof state

const currentChatStore = useCurrentChatStore()

const state = reactive({ content: '' })
const form = useTemplateRef<Form<Schema>>('form')

async function sendMessage({ data }: FormSubmitEvent<Schema>) {
  await currentChatStore.sendMessage(data.content)
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
  <UForm ref="form" :state class="flex gap-4 items-center" @submit="sendMessage">
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
      :loading="currentChatStore.isSending"
      class="-translate-y-1/4"
    />
  </UForm>
</template>
