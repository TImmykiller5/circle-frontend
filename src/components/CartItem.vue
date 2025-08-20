<script setup lang="ts">
import type { Book } from '@/queries/bookQuery'
import { useCartStore } from '@/stores/cart'
import { numberFormatter } from '@/utils/numberFormatter'
import { XIcon } from 'lucide-vue-next'
const cartStore = useCartStore()

interface CartItem extends Book {
  quantity: number
}
defineProps<{
  cartItem: CartItem
}>()
</script>

<template>
  <div>
    <div class="w-full flex flex-row relative">
      <div
        @click="() => cartStore.removeFromCart(cartItem.id)"
        class="shadow-md absolute top-0 right-0 z-20 bg-white rounded-full sm:p-2 p-1 hover:scale-110 transition-all border border-neutral-200"
      >
        <XIcon class="text-black size-4 sm:size-5" />
      </div>
      <div></div>
      <div class="w-28 sm:w-36 md:w-48 overflow-hidden rounded-md aspect-square">
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Book image"
        />
      </div>
      <div class="flex flex-col ml-4">
        <p class="text-sm sm:text-base lg:text-lg font-medium">{{ cartItem.title }}</p>
        <p class="text-sm sm:text-base text-neutral-500">by {{ cartItem.author }}</p>
        <p class="text-sm sm:text-base text-neutral-500">
          Price {{ numberFormatter.format(cartItem.price) }}
        </p>
        <p class="text-sm sm:text-base text-neutral-500">Quantity {{ cartItem.quantity }}</p>

        <p class="text-sm sm:text-base lg:text-lg font-medium text-neutral-700">
          {{ numberFormatter.format(cartItem.price * cartItem.quantity) }}
        </p>
      </div>
    </div>
    <div class="w-full h-[1px] my-4 bg-neutral-200"></div>
  </div>
</template>
