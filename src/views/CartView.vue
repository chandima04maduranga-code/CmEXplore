<script setup lang="ts">
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <section style="padding: 40px;">
    <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
      Your Cart
    </h1>

    <p v-if="cartStore.items.length === 0" style="font-size: 18px; color: #666;">
      Your cart is empty.
    </p>

    <div v-else>
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        style="
          display: flex;
          gap: 20px;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          background: white;
          margin-bottom: 16px;
        "
      >
        <img
          :src="item.thumbnail"
          :alt="item.title"
          style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"
        />

        <div style="flex: 1;">
          <h2 style="font-size: 22px; font-weight: bold;">
            {{ item.title }}
          </h2>

          <p style="color: #666; margin-top: 6px;">
            {{ item.category }}
          </p>

          <p style="color: #be2ed6; font-weight: bold; margin-top: 8px;">
            ${{ item.price }}
          </p>

          <div style="margin-top: 12px; display: flex; gap: 10px; align-items: center;">
            <button
              @click="cartStore.decreaseQuantity(item.id)"
              style="padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer;"
            >
              -
            </button>

            <span style="font-size: 18px; font-weight: bold;">
              {{ item.quantity }}
            </span>

            <button
              @click="cartStore.increaseQuantity(item.id)"
              style="padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer;"
            >
              +
            </button>

            <button
              @click="cartStore.removeFromCart(item.id)"
              style="
                margin-left: 12px;
                background: crimson;
                color: white;
                border: none;
                padding: 8px 14px;
                border-radius: 8px;
                cursor: pointer;
              "
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div
        style="
          margin-top: 24px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 12px;
          background: white;
        "
      >
        <p style="font-size: 20px; font-weight: bold;">
          Total Items: {{ cartStore.totalItems }}
        </p>

        <p style="font-size: 22px; font-weight: bold; color: #be2ed6; margin-top: 8px;">
          Total Price: ${{ cartStore.totalPrice.toFixed(2) }}
        </p>
      </div>
    </div>
  </section>
</template>