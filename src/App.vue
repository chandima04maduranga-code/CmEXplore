<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import ToastMessage from '@/components/ToastMessage.vue'
import { useTheme } from '@/composables/useTheme'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const { applySavedTheme } = useTheme()
const cartStore = useCartStore()
const authStore = useAuthStore()

onMounted(() => {
  applySavedTheme()
  cartStore.loadFromStorage()
  authStore.loadFromStorage()
})

const showShell = computed(() => route.name !== 'login')
</script>

<template>
  <div class="min-h-screen">
    <NavBar v-if="showShell" />
    <main :class="showShell ? 'mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8' : ''">
      <RouterView />
    </main>
    <FooterBar v-if="showShell" />
    <ToastMessage />
  </div>
</template>
