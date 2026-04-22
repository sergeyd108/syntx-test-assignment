<template>
  <div class="inline-flex gap-1.5 px-1 align-middle py-4">
    <span v-for="i in 3" :key="i" class="dot size-1.25 rounded-full bg-current" />
  </div>
</template>

<style scoped>
.dot {
  animation: pulse 1400ms ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 200ms;
}

.dot:nth-child(3) {
  animation-delay: 400ms;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
