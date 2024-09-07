<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { GameSteps, useGameManager } from '../stores/game-manager'
import { computed } from 'vue'

const gameManagerStore = useGameManager()
const { currentRound, howManyRounds, score, currentStep } = storeToRefs(gameManagerStore)
const labels = ['1er', '2ème', '3ème', '4ème', 'Dernier']

const roundLabel = computed(() => labels[currentRound.value - 1])
</script>

<template>
  <p
    class="text-xl text-white md:text-4xl lg:text-5xl xl:text-6xl"
    v-if="currentStep !== GameSteps.FINAL_RESULT"
  >
    {{ roundLabel }} tour - Point{{ score > 1 ? 's' : '' }} {{ score }} / {{ howManyRounds }}
  </p>
</template>
