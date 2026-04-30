<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <label class="block">
    <span class="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">
      Search products
    </span>

    <input
      :value="props.modelValue"
      @input="handleInput"
      type="text"
      placeholder="Search by title or brand"
      class="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5"
    />
  </label>
</template>