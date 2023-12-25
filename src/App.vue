<script setup lang="ts">
import { reactive } from 'vue'

const themeConfig = reactive({
  token: {
    colorPrimary: '#8d4bbb',
    borderRadius: 4
  }
})
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <router-view #default="{ Component, route }">
      <transition mode="in-out" name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </a-config-provider>
</template>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}

div#app {
  position: relative;

  width: auto;
  height: 100vh;
  box-sizing: border-box;

  overflow: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transform: translateY(0);
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
