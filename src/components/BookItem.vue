<script setup lang="ts">
import type { Book } from '@/queries/bookQuery'
import { numberFormatter } from '@/utils/numberFormatter'
import { Expand } from 'lucide-vue-next'
import AppSheet from './AppSheet.vue'
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { toast } from 'vue3-toastify'

const props = defineProps<{
  book: Book
}>()
const cartStore = useCartStore()
const showModal = ref(false)

const itemInCart = computed(() => cartStore.cart.find((item) => item.id === props.book.id))
const canAddToCart = computed(
  () => props.book.availableStock > 0 && (itemInCart.value?.quantity || 0) === 0,
)
const addToCartHandler = () => {
  cartStore.addToCart(props.book, 1)
  toast('Book added to cart', {
    autoClose: 1000,
    theme: 'dark',
    icon: '📚',
    position: toast.POSITION.TOP_CENTER,
    progressStyle: { backgroundColor: 'rgb(59 130 246)' },
  })
  showModal.value = false
}
</script>

<template>
  <AppSheet className="px-4 py-8" x-icon @close="showModal = false" :show="showModal">
    <div class="p-4">
      <div class="w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden pr-4 md:pr-12">
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div>
        <h3 class="text-2xl font-bold mt-4">{{ book.title }}</h3>
        <p class="text-neutral-600 mt-2">by {{ book.author }}</p>
        <p class="mt-4 font-bold text-2xl">{{ numberFormatter.format(book.price) }}</p>
        <div class="flex flex-col gap-2">
          <p class="text-neutral-600 mt-4">Available Stock: {{ book.availableStock }}</p>
          <!-- <span>Quantity</span>
          <div class="flex items-center gap-2">
            <button
              :disabled="count === 0"
              @click="count > 0 && count--"
              class="bg-[#e5e7eb] text-black text-base font-semibold px-4 py-2 rounded-full cursor-pointer disabled:cursor-not-allowed"
            >
              -
            </button>
            <span class="text-black text-base font-semibold px-4 py-2 rounded-full">{{
              count
            }}</span>
            <button
              :disabled="canAddToCart === false"
              @click="count++"
              class="bg-[#e5e7eb] text-black text-base font-semibold px-4 py-2 rounded-full cursor-pointer disabled:cursor-not-allowed"
            >
              +
            </button>
          </div> -->
        </div>
        <button
          v-if="!itemInCart"
          @click="addToCartHandler"
          :disabled="canAddToCart === false"
          class="mt-4 bg-black text-white text-base font-semibold px-4 py-2 rounded-full cursor-pointer disabled:bg-neutral-600 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
        <button
          v-else
          @click="cartStore.removeFromCart(props.book.id)"
          class="mt-4 bg-black text-white text-base font-semibold px-4 py-2 rounded-full cursor-pointer disabled:bg-neutral-600 disabled:cursor-not-allowed"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  </AppSheet>
  <RouterLink :to="'/book/' + book.id">
    <div class="w-full h-full group rounded-md overflow-hidden border border-[#e5e7eb]">
      <div class="aspect-square relative">
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="w-full h-full object-cover"
          :alt="'image of ' + book.title"
        />
        <div
          @click.stop.prevent="showModal = true"
          class="absolute cursor-pointer bottom-8 translate-x-1/2 right-1/2 opacity-0 group-hover:opacity-100 hover:scale-110 bg-white rounded-full transition-all p-2 shadow-md"
        >
          <Expand :size="20" />
        </div>
      </div>
      <div class="relative px-2 py-4">
        <p class="font-medium">{{ book.title }}</p>
        <p class="text-sm text-neutral-500">{{ book.author }}</p>
        <p class="font-semibold mt-2">{{ numberFormatter.format(book.price) }}</p>
      </div>
    </div>
  </RouterLink>
</template>
