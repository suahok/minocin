<script setup lang="ts">
import { inject } from 'vue'
const screenful = inject('screenful')
</script>

<template>
  <div :class="[screenful ? 'loading-screen' : 'loading-topo-']">
    <div class="loading">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.loading-topo- {
  cursor: wait;
  display: grid;
  border: 1px solid rgba(96, 125, 139, 0.182);
  position: absolute;
  inset: 0;
  z-index: 999;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.936);
  }
}

.loading-topo- .loading {
  width: 40px;
  height: 40px;
}
</style>
