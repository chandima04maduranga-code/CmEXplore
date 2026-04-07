<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="rounded-[2rem] border border-red-200 bg-red-50 p-6 dark:border-red-500/30 dark:bg-red-500/10">
    <h3 class="text-lg font-bold text-red-700 dark:text-red-300">{{ title }}</h3>
    <p class="mt-2 text-sm leading-6 text-red-600 dark:text-red-200">{{ description }}</p>
  </div>
</template>
