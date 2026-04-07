<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CartSummary from '@/components/CartSummary.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useToast } from '@/composables/useToast'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const { showToast } = useToast()

const placedOrder = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  paymentMethod: 'credit-card',
  cardNumber: '',
  cardName: '',
  expiry: '',
})

const submitOrder = () => {
  placedOrder.value = true
  showToast('Order placed successfully')
  cartStore.clearCart()
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">Checkout</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Payment and delivery details</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Complete your order by entering delivery details and choosing your preferred payment method.</p>
    </div>

    <EmptyState
      v-if="cartStore.items.length === 0 && !placedOrder"
      title="No items ready for checkout"
      description="Add a product with Add to Cart or Buy Now before opening the payment page."
    />

    <section v-else-if="!placedOrder" class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form class="glass-panel space-y-6 p-6" @submit.prevent="submitOrder">
        <div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Customer Information</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Enter your shipping information and preferred payment method.</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <label class="block">
            <span class="mb-2 block text-sm font-semibold">Full Name</span>
            <input v-model="form.fullName" required type="text" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm font-semibold">Email</span>
            <input v-model="form.email" required type="email" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm font-semibold">Phone</span>
            <input v-model="form.phone" required type="tel" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm font-semibold">City</span>
            <input v-model="form.city" required type="text" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
          </label>
        </div>

        <label class="block">
          <span class="mb-2 block text-sm font-semibold">Address</span>
          <textarea v-model="form.address" required rows="4" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5"></textarea>
        </label>

        <div class="space-y-4 rounded-[1.5rem] bg-brand-50 p-5 dark:bg-brand-900/20">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Payment Method</h3>
          <div class="grid gap-3 sm:grid-cols-3">
            <label class="flex items-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/5">
              <input v-model="form.paymentMethod" type="radio" value="credit-card" /> Credit Card
            </label>
            <label class="flex items-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/5">
              <input v-model="form.paymentMethod" type="radio" value="cash-on-delivery" /> Cash on Delivery
            </label>
            <label class="flex items-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/5">
              <input v-model="form.paymentMethod" type="radio" value="paypal" /> PayPal
            </label>
          </div>

          <div v-if="form.paymentMethod === 'credit-card'" class="grid gap-4 sm:grid-cols-3">
            <label class="block sm:col-span-2">
              <span class="mb-2 block text-sm font-semibold">Card Number</span>
              <input v-model="form.cardNumber" type="text" placeholder="1234 5678 9012 3456" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
            </label>
            <label class="block">
              <span class="mb-2 block text-sm font-semibold">Expiry</span>
              <input v-model="form.expiry" type="text" placeholder="MM/YY" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
            </label>
            <label class="block sm:col-span-3">
              <span class="mb-2 block text-sm font-semibold">Name on Card</span>
              <input v-model="form.cardName" type="text" class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5" />
            </label>
          </div>
        </div>

        <button class="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600" type="submit">
          Place Order
        </button>
      </form>

      <CartSummary :subtotal="cartStore.subtotal" :shipping="cartStore.shipping" :total="cartStore.total">
        <div class="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Items in this order</h3>
          <div v-for="item in cartStore.items" :key="item.product.id" class="flex items-center justify-between gap-3 border-b border-brand-100 pb-3 dark:border-white/10">
            <div>
              <p class="font-semibold">{{ item.product.title }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Qty {{ item.quantity }}</p>
            </div>
            <img :src="item.product.thumbnail" :alt="item.product.title" class="h-12 w-12 rounded-xl object-cover" />
          </div>
        </div>
      </CartSummary>
    </section>

    <section v-else class="glass-panel p-8 text-center">
      <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-3xl text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">✓</div>
      <h2 class="mt-5 text-3xl font-bold text-slate-900 dark:text-white">Order Confirmed</h2>
      <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        Thank you for shopping with CmEXplore. Your order has been placed successfully and is now being prepared.
      </p>
      <RouterLink to="/" class="mt-6 inline-flex rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
        Back to Home
      </RouterLink>
    </section>
  </div>
</template>
