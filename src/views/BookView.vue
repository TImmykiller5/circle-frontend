<script setup lang="ts">
import BookItem from '@/components/BookItem.vue'
import {
  useGetBookByIdQuery,
  useGetBookQuery,
  usePurchaseBookMutation,
  type Book,
} from '@/queries/bookQuery'
import { useCartStore } from '@/stores/cart'
import { numberFormatter } from '@/utils/numberFormatter'
import { Loader2 } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'

const route = useRoute()
const purchaseBooks = usePurchaseBookMutation()
const booksQuery = useGetBookQuery()
const bookQuery = useGetBookByIdQuery(computed(() => route.params.id as string))
const cartStore = useCartStore()
const itemInCart = computed(() =>
  cartStore.cart.find((item) => String(item.id) === route.params.id),
)

const canAddToCart = computed(
  () => (bookQuery.data.value?.availableStock || 0) > 0 && (itemInCart.value?.quantity || 0) === 0,
)

const addToCartHandler = () => {
  cartStore.addToCart(bookQuery.data.value as Book, 1)
  toast('Book added to cart', {
    autoClose: 1000,
    theme: 'dark',
    icon: '📚',
    position: toast.POSITION.TOP_CENTER,
    progressStyle: { backgroundColor: 'rgb(59 130 246)' },
  })
}
</script>

<template>
  <main class="pt-4 max-w-[1280px] px-4 sm:px-8 md:px-12 mx-auto">
    <div
      class="grid gap-4 grid-cols-1 mt-4 sm:grid-cols-2 border-b pb-4 md:pb-8 border-neutral-200"
    >
      <div class="w-full aspect-square">
        <img
          class="w-full h-full object-cover sm:rounded-lg"
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div v-if="!bookQuery.isLoading.value">
        <h1 class="text-3xl font-bold text-neutral-900">
          {{ bookQuery.data.value?.title }}
        </h1>
        <p class="mt-2 text-neutral-600 text-lg font-semibold">
          {{ bookQuery.data.value?.author }}
        </p>
        <p class="text-2xl font-bold mt-2">
          {{ numberFormatter.format(bookQuery.data.value?.price || 0) }}
        </p>
        <p class="text-base text-neutral-600 font-bold mt-3">
          {{ bookQuery.data.value?.availableStock }} items in stock
        </p>
        <p class="text-base text-neutral-600 mt-3">ISBN {{ bookQuery.data.value?.isbn }}</p>
        <div class="flex flex-col md:flex-row gap-4">
          <button
            :disabled="
              purchaseBooks.isPending.value || canAddToCart === false || bookQuery.isFetching.value
            "
            @click="purchaseBooks.mutate([parseInt((route.params.id as string) ?? '0')])"
            class="mt-4 text-base border font-semibold px-4 py-2 rounded-full cursor-pointer disabled:bg-neutral-300 disabled:cursor-not-allowed"
          >
            <span v-if="!purchaseBooks.isPending.value">Buy book</span>
            <Loader2 v-else class="animate-spin mx-auto text-black" />
          </button>
          <div>
            <button
              v-if="!itemInCart"
              @click="addToCartHandler"
              :disabled="canAddToCart === false || bookQuery.isFetching.value"
              class="mt-4 bg-black text-white text-base font-semibold px-4 py-2 rounded-full cursor-pointer disabled:bg-neutral-600 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button
              v-else
              @click="cartStore.removeFromCart(parseInt((route.params.id as string) ?? '0'))"
              class="mt-4 bg-black text-white text-base font-semibold px-4 py-2 rounded-full cursor-pointer disabled:bg-neutral-600 disabled:cursor-not-allowed"
            >
              Remove from Cart
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-4 h-full w-full" v-else>
        <Loader2 class="animate-spin mx-auto size-10 md:size-20" />
      </div>
    </div>
    <div>
      <div>
        <h4 class="text-2xl sm:text-3xl font-bold mt-8 mb-6">Suggested Books</h4>
        <div
          v-if="booksQuery.isLoading.value"
          class="flex items-center justify-center mt-4 h-[200px] md:h-[300px]"
        >
          <Loader2 class="animate-spin mx-auto size-10 md:size-20" />
        </div>
        <div
          v-if="!booksQuery.isLoading.value"
          class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div v-for="book in booksQuery.data.value?.slice(0, 4)" :key="book.id">
            <BookItem :book="book" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
