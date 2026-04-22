<script setup lang="ts">
import { computed, reactive, ref, useTemplateRef } from 'vue'
import type { Form, FormSubmitEvent } from '@nuxt/ui'
import { useChatsStore } from '@/stores/chats.ts'

interface Emits {
  created: [id: string]
  cancel: []
}

const emit = defineEmits<Emits>()

const chatsStore = useChatsStore()

const form = useTemplateRef<Form<typeof state>>('form')

const state = reactive({ name: '' })
const isFormValid = computed(() => !!state.name.trim())
const isCreating = ref(false)

async function onSubmit({ data }: FormSubmitEvent<typeof state>) {
  if (!isFormValid.value) return
  isCreating.value = true

  try {
    const chat = await chatsStore.addNewChat(data.name.trim())
    state.name = ''
    emit('created', chat.id)
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <UForm ref="form" :state="state" class="flex flex-col gap-4" @submit="onSubmit">
    <UFormField name="name" label="Chat Name" required>
      <UInput v-model="state.name" placeholder="Chat Name" class="w-full" autofocus />
    </UFormField>

    <div class="flex justify-end gap-2">
      <UButton color="neutral" variant="ghost" label="Cancel" @click="$emit('cancel')" />
      <UButton type="submit" color="primary" label="Create Chat" :disabled="!isFormValid" :loading="isCreating" />
    </div>
  </UForm>
</template>
