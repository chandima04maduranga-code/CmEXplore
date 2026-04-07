<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="glass-panel mx-auto max-w-2xl p-10 text-center">
    <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">404</p>
    <h1 class="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Page not found</h1>
    <p class="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
      The page you requested does not exist. Return to the CmEXplore catalog to continue browsing products.
    </p>
    <RouterLink to="/" class="mt-6 inline-flex rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">
      Go Home
    </RouterLink>
  </section>
</template>
