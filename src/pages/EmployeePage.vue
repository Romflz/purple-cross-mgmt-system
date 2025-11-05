<template>
  <div>
    <h1>Employee Page</h1>
    <p>Employee ID: {{ employeeId }}</p>
    <p>Edit Mode: {{ isEditMode }}</p>

    <div v-if="isEditMode">
      <h2>Edit Mode</h2>
      <!-- TODO: Edit Mode -->
    </div>
    <div v-else>
      <h2>View Mode</h2>
      <!-- Read-only -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const employeeId = computed(() => route.params.id as string)
const isEditMode = computed(() => route.query.edit === 'true')
</script>
