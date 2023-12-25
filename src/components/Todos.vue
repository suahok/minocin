<script setup lang="ts"></script>

<template>
  <ul>
    <li><img src="https://picsum.photos/1920/1080?random=1" decoding="async" /></li>
    <li><img src="https://picsum.photos/1920/1080?random=2" decoding="async" /></li>
    <li><img src="https://picsum.photos/1920/1080?random=3" decoding="async" /></li>
    <li><img src="https://picsum.photos/1920/1080?random=4" decoding="async" /></li>
    <li><img src="https://picsum.photos/1920/1080?random=5" decoding="async" /></li>
  </ul>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

ul li {
  max-width: 768px;
  margin: 0;
  margin-top: 1rem;
  padding: 0;
  list-style: none;
}

img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
