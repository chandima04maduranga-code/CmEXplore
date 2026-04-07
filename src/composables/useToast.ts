import { computed, ref } from 'vue'

interface ToastState {
  visible: boolean
  message: string
}

const toastState = ref<ToastState>({
  visible: false,
  message: '',
})

let timeoutId: number | undefined

export function useToast() {
  const showToast = (message: string, duration = 2200) => {
    toastState.value = {
      visible: true,
      message,
    }

    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }

    timeoutId = window.setTimeout(() => {
      toastState.value.visible = false
    }, duration)
  }

  return {
    toast: computed(() => toastState.value),
    showToast,
  }
}
