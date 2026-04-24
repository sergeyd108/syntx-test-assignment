import { inject, type InjectionKey, provide, ref, watch } from 'vue'
import { delay } from '@/utils/promise.ts'
import { generateMessageText } from '@/utils/text-gen.ts'
import { useCurrentChatStore } from '@/stores/current-chat.ts'

const injectionKey: InjectionKey<ReturnType<typeof botResponse>> = Symbol('bot-response')

function botResponse() {
  const currentChatStore = useCurrentChatStore()
  const isResponding = ref(false)

  watch(
    () => currentChatStore.messages,
    (messages, oldMessages) => {
      if (messages.length !== oldMessages.length && messages.at(-1)?.sender === 'You') {
        void respond()
      }
    },
  )

  async function respond() {
    if (isResponding.value) return
    isResponding.value = true

    try {
      await delay(1000)
      const content = generateMessageText()
      await currentChatStore.sendMessage(content, 'Chat Bot')
    } finally {
      isResponding.value = false
    }
  }

  return { isResponding }
}

export function provideBotResponse() {
  const state = botResponse()
  provide(injectionKey, state)
  return state
}

export function useBotResponse() {
  const state = inject(injectionKey)
  if (!state) throw new Error('useBotResponse must be used within a Bot provider')
  return state
}
