<script setup lang="ts">
import { RouterLink } from 'vue-router'
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

      <nav style="display: flex; gap: 24px;">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop">Shop</RouterLink>
        <RouterLink to="/cart">Cart</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>