<script setup lang="ts">
import Button from 'primevue/button'

import { storeToRefs } from 'pinia'
import { GameSteps, useGameManager } from '../stores/game-manager'

const gameManagerStore = useGameManager()

const { cta } = storeToRefs(gameManagerStore)
const { runStep, isCurrentStep } = gameManagerStore
</script>

<template>
  <Button
    type="button"
    v-if="cta.label"
    class="min-h-14 lg:min-h-20 !text-2xl lg:!text-3xl !rounded-full !px-16"
    @click="() => (cta.action ? runStep(cta.action) : null)"
    :loading="isCurrentStep(GameSteps.LOADING)"
    :label="cta.label"
  />
</template>
