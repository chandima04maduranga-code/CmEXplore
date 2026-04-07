<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useCurrency } from '@/composables/useCurrency'
import { useToast } from '@/composables/useToast'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/product'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()
const { formatCurrency } = useCurrency()
const { showToast } = useToast()

const addProduct = () => {
  cartStore.addToCart(props.product)
  showToast(`${props.product.title} added to cart`)
}

const buyNow = async () => {
  cartStore.setBuyNowItem(props.product)
  showToast(`Ready to checkout: ${props.product.title}`)
  await router.push('/checkout')
}
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-brand-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/5">
    <RouterLink :to="`/product/${product.id}`" class="relative block overflow-hidden bg-brand-50 dark:bg-brand-900/20">
      <img :src="product.thumbnail" :alt="product.title" class="h-60 w-full object-cover transition duration-500 group-hover:scale-105" />
      <span class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 shadow dark:bg-[#120d19]/90 dark:text-brand-200">
        {{ product.category }}
      </span>
    </RouterLink>

    <div class="flex flex-1 flex-col gap-4 p-5">
      <div class="space-y-2">
        <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">{{ product.brand }}</p>
        <RouterLink :to="`/product/${product.id}`" class="line-clamp-2 text-lg font-bold text-slate-900 transition hover:text-brand-600 dark:text-white">
          {{ product.title }}
        </RouterLink>
        <p class="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ product.description }}</p>
      </div>

      <div class="mt-auto flex items-center justify-between">
        <div>
          <p class="text-xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(product.price) }}</p>
          <p class="text-sm text-amber-500">★ {{ product.rating.toFixed(1) }} • {{ product.stock }} in stock</p>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <button class="rounded-2xl border border-brand-200 px-4 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 dark:border-brand-700 dark:text-brand-200 dark:hover:bg-brand-900/30" @click="addProduct">
          Add to Cart
        </button>
        <button class="rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600" @click="buyNow">
          Buy Now
        </button>
      </div>
    </div>
  </article>
</template>
