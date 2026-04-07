<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="grid gap-8 overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-white shadow-2xl lg:grid-cols-[1.3fr_0.7fr] lg:px-10">
    <div class="space-y-5">
      <span class="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-brand-200">New arrivals</span>
      <h1 class="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">Discover stylish products for every lifestyle.</h1>
      <p class="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
        Explore fashion, beauty, electronics, and everyday essentials in one place. Enjoy a smooth shopping experience
        with curated picks, easy browsing, and a quick checkout flow.
      </p>
      <div class="flex flex-wrap gap-4">
        <RouterLink to="/#catalog" class="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600">Shop Now</RouterLink>
        <RouterLink to="/#catalog" class="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Explore Collection</RouterLink>
      </div>
      <div class="grid gap-4 pt-3 sm:grid-cols-3">
        <div class="rounded-2xl bg-white/10 p-4">
          <p class="text-2xl font-bold">100+</p>
          <p class="text-sm text-slate-300">Explore a growing collection of quality items.</p>
        </div>
        <div class="rounded-2xl bg-white/10 p-4">
          <p class="text-2xl font-bold">Easy</p>
          <p class="text-sm text-slate-300">Find, save, and add your favorite products in seconds.</p>
        </div>
        <div class="rounded-2xl bg-white/10 p-4">
          <p class="text-2xl font-bold">Fast</p>
          <p class="text-sm text-slate-300">Enjoy a simple and smooth order process from cart to checkout.</p>
        </div>
      </div>
    </div>

    <div class="glass-panel flex flex-col justify-between gap-5 p-6 text-slate-800 dark:text-white">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-300">Why customers love us</p>
        <h2 class="mt-2 text-2xl font-bold">Stylish collections, smooth browsing, and shopping made simple.</h2>
      </div>
      <div class="space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <p>• Carefully selected products for everyday living</p>
        <p>• Easy category browsing and quick discovery</p>
        <p>• Add to cart in seconds and continue shopping</p>
        <p>• Quick checkout with a clean and friendly layout</p>
      </div>
    </div>
  </section>
</template>
