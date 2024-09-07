<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGameManager } from '../stores/game-manager'
import { GameSteps } from '../stores/game-manager'

const gameManagerStore = useGameManager()
const { pearlLocation } = storeToRefs(gameManagerStore)
const { isCurrentStep } = gameManagerStore

const classObjects = computed(() => {
  return {
    left: pearlLocation.value === 0,
    right: pearlLocation.value === 2
  }
})
</script>

<template>
  <div
    v-if="isCurrentStep([GameSteps.READY_TO_PLAY, GameSteps.REVEAL, GameSteps.NEXT_ROUND])"
    id="pearl"
    class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[3rem] lg:text-[5rem]"
    :class="classObjects"
  >
    🔮
  </div>
</template>

<style>
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
#pearl {
  opacity: 0;
  animation: fadeIn 100ms 150ms linear forwards;
}
.left {
  transform: translateX(-415%) translateY(-50%);
}
.right {
  transform: translateX(315%) translateY(-50%);
}

@media only screen and (max-width: 1024px) {
  .left {
    transform: translateX(-450%) translateY(-50%);
  }
  .right {
    transform: translateX(350%) translateY(-50%);
  }
}

@media only screen and (max-width: 768px) {
  .left {
    transform: translateX(-390%) translateY(-50%);
  }
  .right {
    transform: translateX(290%) translateY(-50%);
  }
}

@media only screen and (max-width: 668px) {
  .left {
    transform: translateX(-320%) translateY(-50%);
  }
  .right {
    transform: translateX(210%) translateY(-50%);
  }
}
</style>
