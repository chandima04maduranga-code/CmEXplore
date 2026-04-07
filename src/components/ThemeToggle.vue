<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    class="rounded-full border border-brand-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-400 dark:border-white/10 dark:text-slate-200"
    @click="toggleTheme"
  >
    {{ isDark ? 'Light Mode' : 'Dark Mode' }}
  </button>
</template>
