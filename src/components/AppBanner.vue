<script setup lang="ts">
defineProps<{
  imgUrl: string
  text: string
  // className?: string
}>()
</script>

<template>
  <div
    class="w-full relative aspect-[2/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-lg bg-cover bg-no-repeat"
    :style="{ 'background-image': `url(${imgUrl})` }"
  >
    <h3
      class="w-full text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl lg:text-7xl font-bold mix-blend-difference text-white"
    >
      {{ text }}
    </h3>
  </div>
</template>
