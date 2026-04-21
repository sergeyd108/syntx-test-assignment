<script setup lang="ts">
const rows = 6
</script>

<template>
  <div class="flex-1 px-4">
    <div class="mx-auto w-full max-w-3xl flex flex-col gap-4 py-4">
      <div
        v-for="index in rows"
        :key="index"
        class="flex items-end gap-2"
        :class="index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'"
      >
        <USkeleton v-if="index % 2" class="size-8 rounded-full shrink-0" />

        <div
          class="flex flex-col gap-2 px-3.5 py-4 w-2/5 bg-elevated shadow-sm rounded-2xl"
          :class="index % 2 === 0 ? 'rounded-br-sm' : 'rounded-bl-sm'"
        >
          <USkeleton class="h-3.5 w-full" />
          <USkeleton class="h-3.5 w-2/3" />
        </div>
      </div>
    </div>
  </div>
</template>
