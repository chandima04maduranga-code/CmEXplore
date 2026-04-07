<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency'
import type { CartItem } from '@/types/cart'

defineProps<{
  item: CartItem
}>()

defineEmits<{
  (event: 'update-quantity', productId: number, quantity: number): void
  (event: 'remove', productId: number): void
}>()

const { formatCurrency } = useCurrency()
</script>

<template>
  <article class="flex flex-col gap-4 rounded-[1.75rem] border border-brand-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center">
    <img :src="item.product.thumbnail" :alt="item.product.title" class="h-28 w-full rounded-2xl object-cover sm:w-28" />
    <div class="flex-1 space-y-2">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ item.product.title }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.product.brand }} • {{ item.product.category }}</p>
      <p class="text-sm text-slate-600 dark:text-slate-300">{{ formatCurrency(item.product.price) }} each</p>
    </div>
    <div class="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
      <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        Qty
        <input
          :value="item.quantity"
          min="1"
          type="number"
          class="w-20 rounded-xl border border-brand-100 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
          @input="$emit('update-quantity', item.product.id, Number(($event.target as HTMLInputElement).value))"
        />
      </label>
      <p class="text-lg font-bold text-brand-700 dark:text-brand-300">{{ formatCurrency(item.product.price * item.quantity) }}</p>
      <button class="text-sm font-semibold text-red-500 transition hover:text-red-600" @click="$emit('remove', item.product.id)">Remove</button>
    </div>
  </article>
</template>
