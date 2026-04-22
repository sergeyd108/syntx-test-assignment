import { inject, type InjectionKey, type MaybeRefOrGetter, provide, ref, shallowRef, toRef, watch } from 'vue'
import { type ChatMessageData, createChatMessage, fetchChatMessages } from '@/api/chat.ts'

const injectionKey: InjectionKey<ReturnType<typeof chatMessages>> = Symbol('chat-messages')

function chatMessages(chatId: MaybeRefOrGetter<string>) {
  const _chatId = toRef(chatId)
  const messages = shallowRef<ChatMessageData[]>([])
  const error = ref<string>()
  const isLoading = ref(false)

  watch(_chatId, loadChat, { immediate: true })

  async function loadChat() {
    if (isLoading.value) return
    isLoading.value = true
    error.value = undefined

    try {
      messages.value = await fetchChatMessages(_chatId.value)
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
        return
      }
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function sendMessage(content: string, sender = 'You') {
    if (isLoading.value) return
    const message = await createChatMessage(_chatId.value, { content, sender })
    messages.value = [...messages.value, message]
  }

  return { chatId: _chatId, messages, error, isLoading, sendMessage }
}

export function provideChatMessages(chatId: MaybeRefOrGetter<string>) {
  const state = chatMessages(chatId)
  provide(injectionKey, state)
  return state
}

export function useChatMessages() {
  const state = inject(injectionKey)
  if (!state) throw new Error('useChatMessages must be used within a Chat provider')
  return state
}
