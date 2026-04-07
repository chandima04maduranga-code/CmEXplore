<script setup lang="ts">
import { onMounted } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import StatsStrip from '@/components/StatsStrip.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import SortSelect from '@/components/SortSelect.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.loadProducts()
})
</script>

<template>
  <div class="space-y-10">
    <HeroBanner />
    <StatsStrip />

    <section class="space-y-6">
      <div class="flex flex-col gap-2">
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">Shop by Category</p>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Browse popular collections</h2>
        <p class="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          Explore standout categories filled with stylish picks and everyday essentials.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article class="glass-panel p-6">
          <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Beauty</p>
          <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Glow with confidence</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Discover beauty picks that add freshness and style to your routine.</p>
        </article>
        <article class="glass-panel p-6">
          <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Fragrances</p>
          <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Fresh everyday scents</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Choose elegant fragrances that feel modern, light, and memorable.</p>
        </article>
        <article class="glass-panel p-6">
          <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Furniture</p>
          <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Style your space</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Find home pieces that bring comfort, character, and a polished look.</p>
        </article>
        <article class="glass-panel p-6">
          <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Groceries</p>
          <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Everyday essentials</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Pick up practical items quickly and keep your daily routine moving.</p>
        </article>
      </div>
    </section>

    <section id="catalog" class="space-y-6">
      <div class="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">Featured Products</p>
          <h2 class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Explore popular picks</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Browse stylish products, search by name or brand, filter by category, and sort results to find the right match faster.
          </p>
        </div>
        <p class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:bg-white/5 dark:text-slate-300">
          Showing {{ productsStore.filteredProducts.length }} items
        </p>
      </div>

      <div class="grid gap-4 rounded-[2rem] border border-brand-100 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 lg:grid-cols-[1.4fr_1fr_1fr]">
        <SearchBar v-model="productsStore.searchTerm" />
        <CategoryFilter v-model="productsStore.selectedCategory" :options="productsStore.categories" />
        <SortSelect v-model="productsStore.selectedSort" />
      </div>

      <LoadingSpinner v-if="productsStore.loading" />
      <ErrorState v-else-if="productsStore.error" title="Unable to load products" :description="productsStore.error" />
      <EmptyState
        v-else-if="productsStore.filteredProducts.length === 0"
        title="No matching products"
        description="Try changing your keyword, category, or sorting option to see more products."
      />
      <ProductGrid v-else :products="productsStore.filteredProducts" />
    </section>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article class="glass-panel p-6">
        <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Easy Search</p>
        <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Find products faster</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Use search and category browsing to quickly discover what you need.</p>
      </article>
      <article class="glass-panel p-6">
        <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Detailed View</p>
        <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Shop with confidence</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Review product details, prices, images, and ratings before you buy.</p>
      </article>
      <article class="glass-panel p-6">
        <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Saved Cart</p>
        <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Keep items ready</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Add products to your cart and come back when you are ready to checkout.</p>
      </article>
      <article class="glass-panel p-6">
        <p class="text-sm font-semibold text-brand-600 dark:text-brand-300">Quick Checkout</p>
        <h3 class="mt-3 text-2xl font-bold text-slate-900 dark:text-white">Smooth order flow</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Enter your details, choose a payment method, and place your order with ease.</p>
      </article>
    </section>
  </div>
</template>
