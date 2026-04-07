<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorState from '@/components/ErrorState.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import { useCurrency } from '@/composables/useCurrency'
import { useToast } from '@/composables/useToast'
import { fetchProductById } from '@/services/api'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const { formatCurrency } = useCurrency()
const { showToast } = useToast()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref('')

const relatedProducts = computed(() => {
  if (!product.value) {
    return []
  }

  return productsStore.products
    .filter((item) => item.category === product.value?.category && item.id !== product.value?.id)
    .slice(0, 3)
})

const loadProduct = async () => {
  loading.value = true
  error.value = ''
  try {
    const productId = Number(route.params.id)
    product.value = await fetchProductById(productId)
    await productsStore.loadProducts()
  } catch (loadError) {
    const message = loadError instanceof Error ? loadError.message : 'Unable to load this product.'
    error.value = message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})

const handleAddToCart = () => {
  if (!product.value) {
    return
  }

  cartStore.addToCart(product.value)
  showToast(`${product.value.title} added to cart`)
}

const handleBuyNow = async () => {
  if (!product.value) {
    return
  }

  cartStore.setBuyNowItem(product.value)
  showToast(`Ready to checkout: ${product.value.title}`)
  await router.push('/checkout')
}
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <ErrorState v-else-if="error" title="Product not available" :description="error" />
  <div v-else-if="product" class="space-y-10">
    <RouterLink to="/" class="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300">← Back to catalog</RouterLink>

    <section class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="glass-panel overflow-hidden p-4">
        <img :src="product.thumbnail" :alt="product.title" class="h-[420px] w-full rounded-[1.5rem] object-cover" />
      </div>

      <div class="glass-panel p-6 sm:p-8">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">{{ product.category }}</p>
        <h1 class="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{{ product.title }}</h1>
        <p class="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{{ product.description }}</p>

        <div class="mt-6 grid gap-4 rounded-[1.5rem] bg-brand-50 p-5 dark:bg-brand-900/20 sm:grid-cols-2">
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Price</p>
            <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ formatCurrency(product.price) }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Rating</p>
            <p class="text-2xl font-bold text-amber-500">★ {{ product.rating.toFixed(1) }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Brand</p>
            <p class="text-base font-semibold text-slate-900 dark:text-white">{{ product.brand }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">Stock</p>
            <p class="text-base font-semibold text-slate-900 dark:text-white">{{ product.stock }} units</p>
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row">
          <button class="rounded-2xl border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:bg-brand-50 dark:border-brand-700 dark:text-brand-300 dark:hover:bg-brand-900/30" @click="handleAddToCart">
            Add to Cart
          </button>
          <button class="rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600" @click="handleBuyNow">
            Buy Now
          </button>
        </div>
      </div>
    </section>

    <section v-if="relatedProducts.length > 0" class="space-y-5">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">Related picks</p>
        <h2 class="mt-2 text-2xl font-bold text-slate-900 dark:text-white">More products you may like</h2>
      </div>
      <ProductGrid :products="relatedProducts" />
    </section>
  </div>
</template>
