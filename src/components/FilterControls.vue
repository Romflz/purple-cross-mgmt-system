<template>
  <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
    <input
      :value="search"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
      type="text"
      placeholder="Search name or code"
      class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full"
    />

    <select :value="department" @change="$emit('update:department', ($event.target as HTMLSelectElement).value)" class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full">
      <option value="all">All departments</option>
      <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
    </select>

    <select :value="terminated" @change="$emit('update:terminated', ($event.target as HTMLSelectElement).value)" class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full">
      <option value="all">Terminated: All</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <select :value="sortBy" @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)" class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full">
      <option value="name">Sort by Name</option>
      <option value="start">Sort by Start Date</option>
      <option value="termination">Sort by Termination Date</option>
      <option value="department">Sort by Department</option>
      <option value="status">Sort by Status</option>
    </select>

    <select :value="sortDir" @change="$emit('update:sortDir', ($event.target as HTMLSelectElement).value)" class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full">
      <option value="asc">Asc</option>
      <option value="desc">Desc</option>
    </select>

    <button @click="$emit('reset')" class="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full hover:bg-gray-50">Reset</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search: string
  department: string
  terminated: string
  sortBy: string
  sortDir: string
  departments: string[]
}>()

defineEmits<{
  'update:search': [value: string]
  'update:department': [value: string]
  'update:terminated': [value: string]
  'update:sortBy': [value: string]
  'update:sortDir': [value: string]
  reset: []
}>()
</script>
