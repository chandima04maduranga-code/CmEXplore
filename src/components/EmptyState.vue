<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="rounded-[2rem] border border-dashed border-brand-200 bg-white/75 p-10 text-center dark:border-white/10 dark:bg-white/5">
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ title }}</h3>
    <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ description }}</p>
  </div>
</template>
