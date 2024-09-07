<script setup lang="ts">
import { storeToRefs } from 'pinia'
import QuoteLeft from './icons/QuoteLeft.vue'
import QuoteRight from './icons/QuoteRight.vue'
import { useGameManager } from '../stores/game-manager'

const gameManagerStore = useGameManager()
const { message } = storeToRefs(gameManagerStore)
</script>

<template>
  <div class="flex gap-5 px-4 text-3xl text-teal-600" v-if="message">
    <QuoteLeft />
    <p class="text-3xl text-white lg:text-5xl">{{ message }}</p>
    <QuoteRight />
  </div>
</template>
