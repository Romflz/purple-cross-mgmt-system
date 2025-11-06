import { defineStore } from 'pinia'
import { ref } from 'vue'

interface ConfirmOptions {
  title?: string
  message?: string
}

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const confirmCallback = ref<((value: boolean) => void) | null>(null)

  const openConfirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      title.value = options.title || 'Confirm'
      message.value = options.message || 'Are you sure?'
      isOpen.value = true

      confirmCallback.value = resolve
    })
  }

  const confirm = () => {
    confirmCallback.value?.(true)
    close()
  }

  const cancel = () => {
    confirmCallback.value?.(false)
    close()
  }

  const close = () => {
    isOpen.value = false
    title.value = ''
    message.value = ''
    confirmCallback.value = null
  }

  return { isOpen, title, message, openConfirm, confirm, cancel }
})
