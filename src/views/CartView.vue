<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import CartItem from '@/components/CartItem.vue'
import CartSummary from '@/components/CartSummary.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useToast } from '@/composables/useToast'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const { showToast } = useToast()

const hasItems = computed(() => cartStore.items.length > 0)

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId)
  showToast('Item removed from cart')
}

const proceedToCheckout = async () => {
  if (!authStore.isAuthenticated) {
    showToast('Please log in before checkout')
    await router.push('/login?redirect=/checkout')
    return
  }

  await router.push('/checkout')
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">Cart</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Your shopping cart</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Review your items, update quantities, and continue to checkout when you are ready.</p>
    </div>

    <EmptyState
      v-if="!hasItems"
      title="Your cart is empty"
      description="Browse the catalog and add products to continue shopping with CmEXplore."
    />

    <div v-else class="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
      <section class="space-y-4">
        <CartItem
          v-for="item in cartStore.items"
          :key="item.product.id"
          :item="item"
          @remove="removeItem"
          @update-quantity="cartStore.updateQuantity"
        />
      </section>

      <CartSummary :subtotal="cartStore.subtotal" :shipping="cartStore.shipping" :total="cartStore.total">
        <div class="mt-6 space-y-3">
          <button class="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600" @click="proceedToCheckout">
            Proceed to Checkout
          </button>
          <RouterLink to="/" class="block w-full rounded-2xl border border-brand-200 px-4 py-3 text-center text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 dark:border-brand-700 dark:text-brand-300 dark:hover:bg-brand-900/30">
            Continue Shopping
          </RouterLink>
        </div>
      </CartSummary>
    </div>
  </div>
</template>
