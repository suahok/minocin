<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { _import } from '@/helper'

const timeout = ref()
const loading = ref(false)

onBeforeUnmount(() => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
})

function handleClick() {
  openLoadng()
}

function openLoadng() {
  loading.value = true
  timeout.value = setTimeout(() => {
    loading.value = false
    clearTimeout(timeout.value)
  }, 3000)
}
</script>

<template>
  <div class="dashboard">
    <!-- <Hello title="webpack" /> -->
    <component :is="_import.async('Hello')" title="webpack" />
    <p v-loading="loading" class="example">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis dolorum reprehenderit sint consequatur? Labore
      nesciunt recusandae deserunt facere, quisquam assumenda voluptatem ad libero voluptas totam aspernatur itaque
      minima odio qui!
    </p>
    <a-button type="primary" @click="handleClick">按钮</a-button>
    <hr />
    <!-- <Todos /> -->
    <component :is="_import.async('Todos')" />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  overflow: hidden;
  margin: 1rem;
}

.example {
  min-height: 10vh;
  padding: 1rem;

  color: dimgray;
  background-color: whitesmoke;
}
</style>
@/helper/modules/import
