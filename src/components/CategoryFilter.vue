<script setup lang="ts">
defineProps<{
  modelValue: string
  options: string[]
}>()

defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <label class="block">
    <span class="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">Category</span>
    <select
      :value="modelValue"
      class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="all">All Categories</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </label>
</template>
