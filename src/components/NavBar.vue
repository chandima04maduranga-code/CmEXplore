<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-brand-100/80 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#120d19]/90">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="brand-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-glow">C</div>
        <div>
          <p class="text-lg font-bold text-slate-900 dark:text-white">CmEXplore</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Find style, comfort, and everyday essentials</p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-6 md:flex">
        <RouterLink to="/" class="text-sm font-medium text-slate-700 transition hover:text-brand-600 dark:text-slate-200">Home</RouterLink>
        <a href="/#catalog" class="text-sm font-medium text-slate-700 transition hover:text-brand-600 dark:text-slate-200">Shop</a>
        <RouterLink to="/cart" class="relative text-sm font-medium text-slate-700 transition hover:text-brand-600 dark:text-slate-200">
          Cart
          <span class="ml-2 inline-flex min-w-6 justify-center rounded-full bg-brand-500 px-2 py-0.5 text-xs font-semibold text-white">{{ cartStore.itemCount }}</span>
        </RouterLink>
        <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Profile</span>
        <ThemeToggle />
        <RouterLink
          v-if="!authStore.isAuthenticated"
          to="/login"
          class="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Log In
        </RouterLink>
        <button
          v-else
          class="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:text-brand-800 dark:border-brand-700 dark:text-brand-300"
          @click="handleLogout"
        >
          Log Out
        </button>
      </nav>

      <button class="inline-flex rounded-xl border border-brand-200 p-2 md:hidden dark:border-white/10" @click="mobileMenuOpen = !mobileMenuOpen">
        <span class="text-sm font-semibold">Menu</span>
      </button>
    </div>

    <div v-if="mobileMenuOpen" class="border-t border-brand-100 bg-white px-4 py-4 md:hidden dark:border-white/10 dark:bg-[#120d19]">
      <div class="flex flex-col gap-3">
        <RouterLink to="/" class="text-sm font-medium" @click="mobileMenuOpen = false">Home</RouterLink>
        <a href="/#catalog" class="text-sm font-medium" @click="mobileMenuOpen = false">Shop</a>
        <RouterLink to="/cart" class="text-sm font-medium" @click="mobileMenuOpen = false">Cart ({{ cartStore.itemCount }})</RouterLink>
        <span class="text-sm font-medium">Profile</span>
        <RouterLink v-if="!authStore.isAuthenticated" to="/login" class="text-sm font-medium" @click="mobileMenuOpen = false">Log In</RouterLink>
        <button v-else class="text-left text-sm font-medium" @click="handleLogout">Log Out</button>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
