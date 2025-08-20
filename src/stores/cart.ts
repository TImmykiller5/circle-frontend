import type { Book } from '@/queries/bookQuery'
import { defineStore } from 'pinia'

interface CartItem extends Book {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: (): { cart: CartItem[] } => ({
    cart: [],
  }),
  actions: {
    addToCart(book: Book, quantity: number) {
      const item = this.cart.find((item) => item.id === book.id)
      if (item) {
        item.quantity += quantity
      } else {
        this.cart.push({ ...book, quantity: quantity })
      }
    },
    reduceQuantity(bookId: number) {
      const item = this.cart.find((item) => item.id === bookId)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    },
    increaseQuantity(bookId: number) {
      const item = this.cart.find((item) => item.id === bookId)
      if (item) {
        item.quantity++
      }
    },
    removeFromCart(bookId: number) {
      this.cart = this.cart.filter((item) => item.id !== bookId)
    },
  },

  getters: {
    totalItems(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },
})
