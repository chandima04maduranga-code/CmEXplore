<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllProducts } from '../services/api'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../types/product'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    products.value = await getAllProducts()
  } catch (err) {
    error.value = 'Failed to load products.'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section style="padding: 40px;">
    <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
      Shop Products
    </h1>

    <p v-if="loading">Loading products...</p>
    <p v-else-if="error" style="color: red;">{{ error }}</p>

    <div
      v-else
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
      "
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>