import { inject, type InjectionKey, type MaybeRefOrGetter, provide, type Ref, toRef } from 'vue'

const injectionKey: InjectionKey<Ref<boolean | undefined>> = Symbol('compact-view')

export function provideCompactView(compact: MaybeRefOrGetter<boolean | undefined>) {
  const _compact = toRef(compact)
  provide(injectionKey, _compact)
  return _compact
}

export function useCompactView() {
  const compact = inject(injectionKey)
  if (!compact) throw new Error('useCompactView must be used within a CompactView provider')
  return compact
}
