<script setup lang="ts">
import CartItem from '@/components/CartItem.vue'
import OrderSummary from '@/components/OrderSummary.vue'
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>

<template>
  <main class="pt-4 max-w-[1280px] px-4 sm:px-8 md:px-12 mx-auto">
    <div class="w-full">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-8 mb-6 text-center">
        Shopping Cart
      </h1>
      <!-- empty cart -->
      <div v-if="cartStore.cart.length === 0">
        <h4 class="text-2xl sm:text-3xl font-bold mt-8 mb-6 text-center">Cart is empty</h4>
      </div>

      <div class="grid gap-4 grid-cols-1 lg:grid-cols-6 mt-4 md:mt-12">
        <div class="lg:col-span-4">
          <CartItem v-for="cartItem in cartStore.cart" :key="cartItem.id" :cart-item="cartItem" />
        </div>
        <div class="lg:col-span-2"><OrderSummary /></div>
      </div>
    </div>
  </main>
</template>
