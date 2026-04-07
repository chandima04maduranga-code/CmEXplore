import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

const STORAGE_KEY = 'cmexplore-cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const persist = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  const loadFromStorage = () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return
    }

    try {
      const parsed = JSON.parse(raw) as CartItem[]
      items.value = parsed
    } catch {
      items.value = []
    }
  }

  const addToCart = (product: Product, quantity = 1) => {
    const existingItem = items.value.find((item) => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
    persist()
  }

  const setBuyNowItem = (product: Product) => {
    items.value = [{ product, quantity: 1 }]
    persist()
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter((item) => item.product.id !== productId)
    persist()
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const targetItem = items.value.find((item) => item.product.id === productId)
    if (!targetItem) {
      return
    }

    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    targetItem.quantity = quantity
    persist()
  }

  const clearCart = () => {
    items.value = []
    persist()
  }

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
  const shipping = computed(() => (items.value.length > 0 ? 12 : 0))
  const total = computed(() => subtotal.value + shipping.value)

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    total,
    loadFromStorage,
    addToCart,
    setBuyNowItem,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
