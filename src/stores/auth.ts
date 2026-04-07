import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUser } from '@/types/auth'

const STORAGE_KEY = 'cmexplore-auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref('')

  const loadFromStorage = () => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return
    }

    try {
      user.value = JSON.parse(raw) as AuthUser
    } catch {
      user.value = null
    }
  }

  const login = async (username: string, password: string) => {
    loading.value = true
    error.value = ''

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (username.toLowerCase() !== 'chandima' || password !== 'chandimapass') {
        error.value = 'Invalid username or password'
        return false
      }

      const loggedInUser = {
        id: 1,
        username: 'chandima',
        email: 'chandima@example.com',
        firstName: 'Chandima',
        lastName: 'Madhuranga',
        gender: 'male',
        image: '',
        accessToken: 'local-demo-token',
        refreshToken: 'local-demo-refresh',
      } as AuthUser

      user.value = loggedInUser
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
      return true
    } catch {
      error.value = 'Login failed.'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    user,
    loading,
    error,
    isAuthenticated: computed(() => user.value !== null),
    loadFromStorage,
    login,
    logout,
  }
})