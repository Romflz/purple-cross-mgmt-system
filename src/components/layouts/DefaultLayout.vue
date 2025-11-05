<template>
  <div>
    Default layout
    <Header></Header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/ui/Header.vue'
</script>
