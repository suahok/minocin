<script setup lang="ts"></script>

<template>
  <n-config-provider preflight-style-disabled>
    <router-view #default="{ Component, route }">
      <transition mode="in-out" name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </n-config-provider>
</template>

<style lang="scss">
body {
  overflow: hidden;
  overflow-y: auto;

  max-height: 100vh;
  margin: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.n-config-provider {
  overflow: hidden;
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
