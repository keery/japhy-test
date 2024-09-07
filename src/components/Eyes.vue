<script setup lang="ts">
import Image from 'primevue/image'
import { storeToRefs } from 'pinia'
import { useGameManager } from '../stores/game-manager'
import { computed } from 'vue'

const gameManagerStore = useGameManager()
const { eyesColor } = storeToRefs(gameManagerStore)

const classObject = computed(() => ({
  isBlue: eyesColor.value === 'blue',
  isRed: eyesColor.value === 'red'
}))
</script>

<template>
  <Image
    id="eyes"
    src="/eyes.png"
    alt="Game master eyes"
    class="absolute top-0 left-1/2 translate-x-[-50%] contrast-0"
    :class="classObject"
  />
</template>

<style>
#eyes {
  transition:
    filter ease-in-out 100ms,
    transform 200ms ease-in-out;
}

.isBlue {
  filter: invert();
  transform: translateX(-50%) scale(1.5);
}
.isRed {
  filter: none;
  transform: translateX(-50%) scale(1.5);
}
</style>
