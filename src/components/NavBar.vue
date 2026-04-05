<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <header
    style="
      padding: 16px 24px;
      border-bottom: 1px solid #ddd;
      background: white;
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
    >
      <h1 style="font-size: 28px; font-weight: bold; color: #be2ed6;">
        CmEXplore
      </h1>

      <nav style="display: flex; gap: 24px; align-items: center;">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop">Shop</RouterLink>
        <RouterLink to="/cart">Cart ({{ cartStore.totalItems }})</RouterLink>

        <template v-if="authStore.isLoggedIn">
          <span style="color: #555;">{{ authStore.username }}</span>
          <button
            @click="handleLogout"
            style="
              background: black;
              color: white;
              border: none;
              padding: 8px 14px;
              border-radius: 8px;
              cursor: pointer;
            "
          >
            Logout
          </button>
        </template>

        <RouterLink v-else to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>