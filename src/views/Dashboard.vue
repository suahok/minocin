<script setup lang="ts">
import { onMounted, ref, unref } from 'vue'
import { request } from '@/service/axios'

const loading = ref(false)
const images = ref()

onMounted(() => {
  getData()
  getData()
})

async function getData() {
  loading.value = true
  try {
    images.value = await request<object[]>({
      url: '/v2/list',
      params: { page: 2, limit: 10 }
    })
  } catch (reason) {
    console.error(reason)
  } finally {
    loading.value = false
  }
}

function handleClick() {
  openLoadng()
}

function openLoadng() {
  loading.value = true
  const timeout = setTimeout(() => {
    loading.value = false
    clearTimeout(timeout)
  }, 3000)
}

function handleClickProxy(event: MouseEvent) {
  const todo = delegate({ event, root: 'ul', selector: 'li', propKey: 'id' })
  console.log(todo)
}

type DelegateRaw = { event: MouseEvent; root: string; selector: string; propKey: string }
function delegate({ event, selector, root, propKey }: DelegateRaw) {
  let element = event.target as HTMLElement
  while (!element.matches(selector)) {
    if (element.matches(root)) {
      element = null as any
      break
    }
    element = element.parentElement as HTMLElement
  }
  if (element) {
    let value = element.dataset[propKey]
    const data = value && images.value.find(({ id }) => id === value)
    if (data) return unref(data)
  }
}
</script>

<template>
  <div class="dashboard">
    <Todos :data="images" prop-key="download_url" />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  margin: 1rem;
}

.user-list {
  padding-left: 16px;

  .list-item {
    margin: 12px 0;
    font-family: 'Roboto';
  }
}
</style>
