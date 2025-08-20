<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import { twMerge } from 'tailwind-merge'

defineProps<{
  show: boolean
  xIcon?: boolean
  className?: string
}>()

const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}
</script>

<template>
  <div
    @click="close"
    v-if="show"
    class="fixed h-screen w-screen overflow-y-scroll inset-0 bg-color z-50 flex items-center justify-center transition-all"
  >
    <div
      @click="$event.stopPropagation()"
      :class="
        twMerge(
          'relative z-10 w-10/12 max-w-[600px] rounded-md shadow-sm bg-white zoom-in',
          className,
        )
      "
    >
      <div
        v-if="xIcon"
        @click="close"
        class="shadow-md absolute top-4 right-4 z-20 bg-white rounded-full p-2 hover:scale-110 transition-all border border-neutral-200"
      >
        <XIcon class="text-black size-4 sm:size-6" />
      </div>
      <slot></slot>
    </div>
  </div>
  <!-- <div class="bg-black/50 fixed z-1 inset-0"></div> -->
</template>

<style>
/* 10, 20, 30 ... 100 control */
@keyframes zoom-in {
  10% {
    transform: scale(0.8);
  }

  20% {
    transform: scale(0.8);
  }

  30% {
    transform: scale(0.9);
  }

  40% {
    transform: scale(0.9);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes bg-color {
  10% {
    background-color: #00000000;
  }

  100% {
    background-color: #00000060;
  }
}

.zoom-in {
  animation: zoom-in 0.2s;
}

.bg-color {
  animation: bg-color 0.2s forwards;
}
</style>
