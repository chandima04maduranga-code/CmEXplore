<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('Chandima')
const password = ref('Chandi')

const router = useRouter()
const authStore = useAuthStore()

function handleLogin() {
  if (!username.value || !password.value) {
    alert('Please enter username and password.')
    return
  }

  authStore.login(username.value)
  router.push('/')
}
</script>

<template>
  <section style="padding: 40px; display: flex; justify-content: center;">
    <div
      style="
        width: 100%;
        max-width: 420px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 12px;
        padding: 24px;
      "
    >
      <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 20px;">
        Login
      </h1>

      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px;">Username</label>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;"
        />
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px;">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px;"
        />
      </div>

      <button
        @click="handleLogin"
        style="
          width: 100%;
          background: #be2ed6;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        "
      >
        Login
      </button>
    </div>
  </section>
</template>