<script setup lang="ts">
import Shell from './Shell.vue'
import ModalRules from './ModalRules.vue'
import MainActionButton from './MainActionButton.vue'
import GameMessage from './GameMessage.vue'
import Score from './Score.vue'
import Eyes from './Eyes.vue'
import FinalResult from './FinalResult.vue'
import Pearl from './Pearl.vue'

import { storeToRefs } from 'pinia'
import { useGameManager, GameSteps } from '../stores/game-manager'
import { onMounted } from 'vue'

const gameManagerStore = useGameManager()
const { selectedShell } = storeToRefs(gameManagerStore)
const { isCurrentStep, runStep } = gameManagerStore

onMounted(() => {
  runStep(GameSteps.READY_TO_PLAY)
})
</script>
<template>
  <Eyes />
  <header class="fixed top-0 left-0 right-0 flex justify-end px-5 pt-4 md:pt-12">
    <Score />
  </header>
  <div class="relative w-full">
    <div v-if="isCurrentStep(GameSteps.FINAL_RESULT)">
      <FinalResult />
    </div>
    <div
      v-else
      class="relative w-60% h-[60vh] z-1"
      :class="{ isShuffling: isCurrentStep(GameSteps.SHUFFLING) }"
    >
      <Shell
        v-for="n in 3"
        :key="n"
        :index="n - 1"
        :isFurtherBack="
          isCurrentStep([
            GameSteps.REVEAL,
            GameSteps.READY_TO_PLAY,
            GameSteps.NEXT_ROUND,
            GameSteps.DISPLAY_RULES
          ])
        "
        :isClickable="isCurrentStep(GameSteps.MAKE_A_CHOICE)"
        :isSelected="n - 1 === selectedShell"
        :class="{ first: n === 1, second: n === 2, third: n === 3 }"
      />
    </div>

    <Pearl />
  </div>
  <footer class="fixed bottom-0 left-0 right-0 flex flex-col items-center gap-10 px-4 py-8">
    <MainActionButton />
    <GameMessage />
  </footer>
  <ModalRules :visible="isCurrentStep(GameSteps.DISPLAY_RULES)" />
</template>
