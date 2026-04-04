<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '../services/api'
import type { Product } from '../types/product'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const id = route.params.id as string
    product.value = await getProductById(id)
  } catch (err) {
    error.value = 'Failed to load product details.'
    console.error(err)
  } finally {
    loading.value = false
  }
})

function handleAddToCart() {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}
</script>

<template>
  <section style="padding: 40px;">
    <p v-if="loading" style="font-size: 18px;">Loading product details...</p>
    <p v-else-if="error" style="font-size: 18px; color: red;">{{ error }}</p>

    <div
      v-else-if="product"
      style="
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      "
    >
      <div>
        <img
          :src="product.thumbnail"
          :alt="product.title"
          style="
            width: 100%;
            max-width: 500px;
            height: 400px;
            object-fit: cover;
            border-radius: 12px;
          "
        />
      </div>

      <div>
        <p style="color: #be2ed6; font-weight: 600; text-transform: capitalize;">
          {{ product.category }}
        </p>

        <h1 style="font-size: 40px; font-weight: bold; margin-top: 12px;">
          {{ product.title }}
        </h1>

        <p style="margin-top: 16px; font-size: 18px; color: #444;">
          {{ product.description }}
        </p>

        <p style="margin-top: 20px; font-size: 28px; font-weight: bold; color: #be2ed6;">
          ${{ product.price }}
        </p>

        <p style="margin-top: 12px; color: #666;">
          Brand: {{ product.brand }}
        </p>

        <p style="margin-top: 8px; color: #666;">
          Stock: {{ product.stock }}
        </p>

        <p style="margin-top: 8px; color: #666;">
          Rating: {{ product.rating }}
        </p>

        <button
          @click="handleAddToCart"
          style="
            margin-top: 24px;
            background: #be2ed6;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  </section>
</template>