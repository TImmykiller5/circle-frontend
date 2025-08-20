<script setup lang="ts">
import { usePurchaseBookMutation } from '@/queries/bookQuery'
import { useCartStore } from '@/stores/cart'
import { numberFormatter } from '@/utils/numberFormatter'
import { Loader2 } from 'lucide-vue-next'

const cartStore = useCartStore()
const purchaseBooks = usePurchaseBookMutation()
</script>

<template>
  <div class="w-full bg-neutral-100 rounded-lg p-4 sm:px-6 sm:py-6 lg:px-4 lg:py-6">
    <h4 class="text-lg sm:text-xl font-medium mb-4">Order Summary</h4>
    <div class="my-6 bg-neutral-200 h-[1px]"></div>
    <div class="flex justify-between items-center">
      <p class="text-sm sm:text-base font-medium">Order Total</p>
      <p class="text-sm sm:text-base font-medium">
        {{ numberFormatter.format(cartStore.totalPrice) }}
      </p>
    </div>
    <button
      :disabled="purchaseBooks.isPending.value || cartStore.cart.length === 0"
      @click="purchaseBooks.mutate([...cartStore.cart.map((item) => item.id)])"
      class="w-full bg-black text-white py-2 rounded-full mt-4"
    >
      <span v-if="!purchaseBooks.isPending.value">Checkout</span>
      <Loader2 v-else class="animate-spin mx-auto" />
    </button>
  </div>
</template>
