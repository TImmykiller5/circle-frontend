<script setup lang="ts">
import AppBanner from '@/components/AppBanner.vue'
import BookItem from '@/components/BookItem.vue'
import { useGetBookQuery } from '@/queries/bookQuery'
import { Loader2 } from 'lucide-vue-next'

const booksQuery = useGetBookQuery()
</script>

<template>
  <main class="pt-4 max-w-[1280px] px-4 sm:px-8 md:px-12 mx-auto">
    <AppBanner
      img-url="https://images.unsplash.com/photo-1599901723404-e38e7192b930?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGJvb2slMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D"
      text="SHOP ALL BOOKS"
    />
    <h4 class="text-2xl sm:text-3xl font-bold mt-8 mb-6">Shop All</h4>
    <div
      v-if="booksQuery.isLoading.value"
      class="flex items-center justify-center mt-4 h-[200px] md:h-[300px]"
    >
      <Loader2 class="animate-spin mx-auto size-10 md:size-20" />
    </div>
    <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="book in booksQuery.data.value" :key="book.id">
        <BookItem :book="book"> Hello </BookItem>
      </div>
    </div>
  </main>
</template>
