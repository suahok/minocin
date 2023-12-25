import { createRouter, createWebHistory } from 'vue-router'
import { _import } from '@/helper'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: _import('Dashboard')
    }
  ]
})
