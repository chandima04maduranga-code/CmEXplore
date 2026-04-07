<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toast } = useToast()
</script>

<template>
  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="translate-y-6 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-6 opacity-0">
    <div
      v-if="toast.visible"
      class="fixed bottom-6 right-6 z-50 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-slate-900"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>
