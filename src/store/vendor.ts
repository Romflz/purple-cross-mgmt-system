import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVendorStore = defineStore('vendor', () => {
  // In a real project on login we would make a fetch action to get vendor data
  const vendorName = ref('Purple Cross Ltd.')
  const userName = ref('Demo User')
  const role = ref('Manager')

  return { vendorName, userName, role }
})
