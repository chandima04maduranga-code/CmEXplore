import { computed, ref } from 'vue'

const isDark = ref(false)
const STORAGE_KEY = 'cmexplore-theme'

function applyTheme(nextState: boolean) {
  isDark.value = nextState
  document.documentElement.classList.toggle('dark', nextState)
  localStorage.setItem(STORAGE_KEY, nextState ? 'dark' : 'light')
}

export function useTheme() {
  const applySavedTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark)
  }

  const toggleTheme = () => applyTheme(!isDark.value)

  return {
    isDark: computed(() => isDark.value),
    applySavedTheme,
    toggleTheme,
  }
}
