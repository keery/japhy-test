<script setup lang="ts">
import { defineProps } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { GameSteps, useGameManager } from '../stores/game-manager'

const { visible } = defineProps<{
  visible: boolean
}>()
const { runStep } = useGameManager()
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="Comment ça marche ?"
    :closable="false"
    class="max-w-[90%]"
  >
    <div class="text-lg">
      <div>La perle va être caché en dessous d'un des 3 coquillages et ensuite être mélangés.</div>
      <div>Vous devez trouver sous quel coquillage se cache la perle.</div>
      <div>
        Vous affrontez le maître du jeu en 5 manches, celui qui a gagné le plus de manches sur les 5
        remporte la partie.
      </div>
    </div>
    <div class="flex flex-col justify-end gap-2 mt-8 md:flex-row">
      <Button
        type="button"
        label="Ne plus afficher les règles"
        severity="secondary"
        outlined
        @click="runStep(GameSteps.STOP_SHOWING_RULES)"
      ></Button>
      <Button type="button" label="Jouer" @click="runStep(GameSteps.SHUFFLING)"></Button>
    </div>
  </Dialog>
</template>
