<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../types/product'
import { useCartStore } from '../stores/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

function handleAddToCart() {
  cartStore.addToCart(props.product)
}
</script>

<template>
  <div
    style="
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 16px;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    "
  >
    <img
      :src="product.thumbnail"
      :alt="product.title"
      style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;"
    />

    <h2 style="margin-top: 12px; font-size: 20px; font-weight: bold;">
      {{ product.title }}
    </h2>

    <p style="margin-top: 8px; color: #666;">
      {{ product.category }}
    </p>

    <p style="margin-top: 8px; color: #be2ed6; font-weight: bold; font-size: 18px;">
      ${{ product.price }}
    </p>

    <p style="margin-top: 8px; color: #444;">
      {{ product.description }}
    </p>

    <div style="margin-top: 16px; display: flex; gap: 10px;">
      <button
        @click="handleAddToCart"
        style="
          background: #be2ed6;
          color: white;
          border: none;
          padding: 10px 14px;
          border-radius: 8px;
          cursor: pointer;
        "
      >
        Add to Cart
      </button>

      <RouterLink
        :to="`/product/${product.id}`"
        style="
          background: black;
          color: white;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 8px;
        "
      >
        View
      </RouterLink>
    </div>
  </div>
</template>