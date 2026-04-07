<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { showToast } = useToast()

const credentials = reactive({
  username: 'chandima',
  password: 'chandimapass',
})

const redirectPath = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' ? redirect : '/'
})

const submit = async () => {
  const success = await authStore.login(credentials.username, credentials.password)
  if (!success) {
    return
  }

  showToast('Login successful')
  await router.push(redirectPath.value)
}
</script>

<template>
  <section class="grid min-h-screen items-center bg-[radial-gradient(circle_at_top,_rgba(190,46,214,0.22),_transparent_35%),linear-gradient(180deg,_#0f0a14,_#1b1028)] px-4 py-12 sm:px-6">
    <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="text-white">
        <span class="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-brand-200">Member access</span>
        <h1 class="mt-5 text-4xl font-bold leading-tight sm:text-5xl">Welcome back to CmEXplore</h1>
        <p class="mt-4 max-w-xl text-base leading-7 text-slate-300">
          Sign in to continue to checkout, manage your shopping flow, and enjoy a more personalized experience.
        </p>
        <div class="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-300">
          <p class="font-semibold text-white">Sample account</p>
          <p>Username: <span class="font-semibold text-brand-200">chandima</span></p>
          <p>Password: <span class="font-semibold text-brand-200">chandimapass</span></p>
        </div>
      </div>

      <div class="rounded-[2rem] border border-white/10 bg-white/95 p-6 shadow-2xl sm:p-8">
        <div class="mb-6 text-center">
          <div class="brand-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-glow">C</div>
          <h2 class="mt-4 text-2xl font-bold text-slate-900">Log In</h2>
          <p class="mt-2 text-sm text-slate-500">Sign in to continue your shopping experience.</p>
        </div>

        <form class="space-y-5" @submit.prevent="submit">
          <label class="block">
            <span class="mb-2 block text-sm font-semibold text-slate-700">Username</span>
            <input v-model="credentials.username" type="text" required class="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100" />
          </label>
          <label class="block">
            <span class="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <input v-model="credentials.password" type="password" required class="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100" />
          </label>

          <div v-if="authStore.error" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {{ authStore.error }}
          </div>

          <button class="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70" :disabled="authStore.loading" type="submit">
            {{ authStore.loading ? 'Signing in...' : 'Log In' }}
          </button>
        </form>

        <RouterLink to="/" class="mt-5 inline-flex w-full justify-center text-sm font-semibold text-brand-700 hover:text-brand-800">
          Continue as visitor
        </RouterLink>
      </div>
    </div>
  </section>
</template>