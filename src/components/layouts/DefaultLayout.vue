<template>
  <div>
    <Header></Header>
    <div class="max-w-7xl mx-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/ui/Header.vue'
</script>
