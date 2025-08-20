import { useCartStore } from '@/stores/cart'
import apiService from '@/utils/axiosInstance'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toValue, type MaybeRef } from 'vue'
import { toast } from 'vue3-toastify'

export const useGetBookQuery = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      try {
        const response = await apiService.get<BooksResp>('/books')
        return response.data.books
      } catch (err) {
        toast('Failed to fetch books', {
          autoClose: 1000,
          theme: 'dark',
          icon: '❌',
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: 'rgb(59 130 246)' },
        })
        throw new Error('Failed to fetch books', { cause: err })
      }
    },
  })
}

export const useGetBookByIdQuery = (id: MaybeRef<string>) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      try {
        const response = await apiService.get<{ book: Book }>(`/books/${toValue(id)}`)
        return response.data.book
      } catch (err) {
        toast('Book not found', {
          autoClose: 1000,
          theme: 'dark',
          icon: '❌',
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: 'rgb(59 130 246)' },
        })
        throw new Error('Failed to fetch books', { cause: err })
      }
    },
  })
}

export const usePurchaseBookMutation = () => {
  const cartStore = useCartStore()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bookIds: number[]) => {
      if (bookIds.length === 0) {
        throw new Error('No books selected')
      }
      try {
        for (let index = 0; index < bookIds.length; index++) {
          const element = bookIds[index]
          await apiService.post(`/books/${element}/purchase`)
          cartStore.removeFromCart(element)
        }
      } catch {
        throw new Error('Failed to purchase books')
      }
    },
    onSuccess: (_, variables) => {
      cartStore.cart = []
      toast(
        `${variables.length > 1 ? `${variables.length} books` : '1 book'} purchased successfully`,
        {
          autoClose: 1000,
          theme: 'dark',
          icon: '✅',
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: 'rgb(59 130 246)' },
        },
      )
    },
    onError: (err, variables) => {
      toast(`Failed to purchase ${variables.length > 1 ? `${variables.length} books` : '1 book'}`, {
        autoClose: 1000,
        theme: 'dark',
        icon: '❌',
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: 'rgb(59 130 246)' },
      })
    },

    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: ['book'] })
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export interface BooksResp {
  books: Book[]
}

export interface Book {
  id: number
  title: string
  author: string
  isbn: string
  price: number
  availableStock: number
}
