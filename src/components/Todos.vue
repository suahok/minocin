<script setup lang="ts">
withDefaults(defineProps<{ data?: object[]; propKey: string }>(), { propKey: 'url' })
</script>

<template>
  <ul class="image-list">
    <li v-for="(item, i) in data" :key="i" class="image-list-item">
      <img :src="item[propKey]" decoding="async" loading="lazy" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.image-list {
  margin: 0;
  padding: 0;

  .image-list-item {
    overflow: hidden;
    aspect-ratio: 16 / 9;
    border-radius: 0.6rem;
    padding: 0;
    margin: 0;
    margin-top: 1rem;
    list-style: none;
    background: whitesmoke;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
