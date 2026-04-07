<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency'

defineProps<{
  subtotal: number
  shipping: number
  total: number
}>()

const { formatCurrency } = useCurrency()
</script>

<template>
  <aside class="glass-panel sticky top-28 p-6">
    <h3 class="text-xl font-bold text-slate-900 dark:text-white">Order Summary</h3>
    <div class="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
      <div class="flex items-center justify-between">
        <span>Subtotal</span>
        <span>{{ formatCurrency(subtotal) }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span>Shipping</span>
        <span>{{ formatCurrency(shipping) }}</span>
      </div>
      <div class="flex items-center justify-between border-t border-brand-100 pt-4 text-base font-bold text-slate-900 dark:border-white/10 dark:text-white">
        <span>Total</span>
        <span>{{ formatCurrency(total) }}</span>
      </div>
    </div>
    <slot />
  </aside>
</template>
