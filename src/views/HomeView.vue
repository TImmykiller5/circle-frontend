<script setup lang="ts">
import AppBanner from '../components/AppBanner.vue'
import BookItem from '@/components/BookItem.vue'
import { useGetBookQuery } from '@/queries/bookQuery'
import { Loader2 } from 'lucide-vue-next'

const { data, isLoading } = useGetBookQuery()
</script>

<template>
  <main class="pt-4 pb-4 md:pb-12 max-w-[1280px] px-4 sm:px-8 md:px-12 mx-auto">
    <AppBanner
      imgUrl="https://images.unsplash.com/photo-1569728723358-d1a317aa7fba?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      text="CIRCLE STORE"
    />
    <h4 class="text-2xl sm:text-3xl font-bold mt-8 mb-6">Featured Books</h4>
    <div v-if="isLoading" class="flex items-center justify-center mt-4 h-[200px] md:h-[300px]">
      <Loader2 class="animate-spin mx-auto size-10 md:size-20" />
    </div>
    <div v-else class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div v-for="book in data?.slice(0, 8)" :key="book.id">
        <BookItem :book="book" />
      </div>
    </div>
    <!-- <TheWelcome /> -->
  </main>
</template>
