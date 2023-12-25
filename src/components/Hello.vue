<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <h1 class="title">Hello, {{ title }}!</h1>
</template>

<style scoped lang="scss">
.title {
  color: orange;
  font-family: 'Monaco';
}
</style>
