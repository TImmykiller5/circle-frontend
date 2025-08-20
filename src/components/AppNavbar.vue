<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { ShoppingBag } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
const cartStore = useCartStore()

// defineProps<{
//   navigation: string
// }>()
</script>

<template>
  <nav class="px-4 sm:px-8 md:px-12 sticky top-0 border-b border-[#e5e7eb]">
    <div class="max-w-[1280px] mx-auto py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <RouterLink to="/">
          <span class="text-2xl font-semibold">STORE</span>
        </RouterLink>
        <RouterLink
          active-class="!text-neutral-900 "
          class="text-neutral-500 hover:text-neutral-900"
          to="/books"
        >
          <span class="text-sm">SHOP ALL</span>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/cart">
          <div class="bg-black rounded-full px-4 py-1 text-white flex items-center gap-2">
            <ShoppingBag class="" :size="18" />
            <span>{{ cartStore.totalItems }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
