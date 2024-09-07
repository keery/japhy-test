<script setup lang="ts">
import { defineProps } from 'vue'
import { useGameManager } from '../stores/game-manager'

const { onSelectShell } = useGameManager()

const { index, isFurtherBack, isClickable, isSelected } = defineProps<{
  index: number
  isFurtherBack: boolean
  isClickable: boolean
  isSelected: boolean
}>()
</script>

<template>
  <div
    class="shell text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[9rem] relative"
    :class="{ isFurtherBack, isClickable }"
    @click="
      () => {
        isClickable ? onSelectShell(index) : null
      }
    "
  >
    <div class="inner-container">🐚</div>
    <div
      v-if="isClickable"
      class="absolute top-0 bottom-0 border-4 rounded-full aspect-square left-1/2 translate-x-[-50%] opacity-0 hover:opacity-100 hover:border-teal-600"
      :class="{ 'opacity-100 border-teal-600': isSelected }"
    ></div>
  </div>
</template>

<style>
.shell {
  transition: transform ease-in-out 400ms;
  cursor: default;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.isClickable {
  cursor: pointer;
}

.inner-container {
  transition: transform ease-in-out 200ms;
}

.isClickable.first:hover .inner-container {
  transform: scale(1.1);
}
.isClickable.second:hover .inner-container {
  transform: scale(1.1);
}
.isClickable.third:hover .inner-container {
  transform: scale(1.1);
}

@keyframes shufflingFirstShell {
  0% {
    transform: translateX(-250%) translateY(-130%);
  }

  20% {
    transform: translateX(-50%) translateY(-50%);
  }

  25% {
    transform: translateX(-50%) translateY(-50%);
  }

  40% {
    transform: translateX(-180%) translateY(20%);
  }
  50% {
    transform: translateX(-180%) translateY(20%);
  }
  75% {
    transform: translateX(-50%) translateY(-50%);
  }

  100% {
    transform: translateX(-250%) translateY(-50%);
  }
}

@keyframes shufflingSecondShell {
  0% {
    transform: translateX(-50%) translateY(-130%);
  }

  20% {
    transform: translateX(-50%) translateY(-50%) rotateZ(80deg);
  }

  25% {
    transform: translateX(-50%) translateY(-50%) rotateZ(80deg);
  }

  40% {
    transform: translateX(-50%) translateY(-100%) rotateZ(80deg);
  }
  50% {
    transform: translateX(-50%) translateY(-100%) rotateZ(80deg);
  }
  75% {
    transform: translateX(-50%) translateY(-50%) rotateZ(60deg);
  }
  100% {
    transform: translateX(-50%) translateY(-50%);
  }
}

@keyframes shufflingThirdShell {
  0% {
    transform: translateX(150%) translateY(-130%);
  }

  20% {
    transform: translateX(-50%) translateY(-50%) rotateZ(60deg);
  }

  25% {
    transform: translateX(-50%) translateY(-50%) rotateZ(60deg);
  }

  40% {
    transform: translateX(80%) translateY(20%) rotateZ(60deg);
  }
  50% {
    transform: translateX(80%) translateY(20%) rotateZ(60deg);
  }
  75% {
    transform: translateX(-50%) translateY(-50%) rotateZ(60deg);
  }
  100% {
    transform: translateX(150%) translateY(-50%);
  }
}

.isShuffling .first {
  animation: shufflingFirstShell 4.8s forwards;
}

.isShuffling .second {
  animation: shufflingSecondShell 4.8s forwards;
}

.isShuffling .third {
  animation: shufflingThirdShell 4.8s forwards;
}

.isFurtherBack.first {
  transform: translateX(-250%) translateY(-130%);
}
.isFurtherBack.second {
  transform: translateX(-50%) translateY(-130%);
}
.isFurtherBack.third {
  transform: translateX(150%) translateY(-130%);
}

.first {
  transform: translateX(-250%) translateY(-50%);
}
.second {
  transform: translateX(-50%) translateY(-50%);
}
.third {
  transform: translateX(150%) translateY(-50%);
}

@keyframes rotateBoard {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(720deg);
  }
}

.isShuffling {
  animation: rotateBoard 1.1s 2.4s forwards linear;
}
</style>
