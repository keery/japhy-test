<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameManager } from '../stores/game-manager'

const gameManagerStore = useGameManager()
const { hasWon, score, howManyRounds } = storeToRefs(gameManagerStore)
</script>

<template>
  <div class="flex flex-col">
    <p class="flex justify-center text-6xl text-white">{{ hasWon ? 'Gagné 🏆' : 'Perdu 😭' }}</p>
    <p class="flex justify-center mt-6 text-4xl text-white">
      Score final est {{ score }} / {{ howManyRounds }}
    </p>
  </div>
</template>
