import { createRouter, createWebHistory } from 'vue-router'

import AppView from '../views/AppView.vue'
import HomeView from '../views/HomeView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import DiscoverLend from '../components/app/discover/DiscoverLend.vue'
import DiscoverBorrow from '../components/app/discover/DiscoverBorrow.vue'
import DiscoverLendItem from '../components/app/discover/DiscoverLendItem.vue'
import DiscoverBorrowItem from '../components/app/discover/DiscoverBorrowItem.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/discover',
      name: 'discover',
      component: AppView,
      children: [
        {
          path: '/discover',
          name: 'discover-lend',
          component: DiscoverView,
          children: [
            {
              path: '/discover',
              name: 'discover-lend',
              component: DiscoverLend
            },
            {
              path: '/discover/borrow',
              name: 'discover-borrow',
              component: DiscoverBorrow
            }
          ]
        },
        {
          path: '/discover/lend/:id',
          name: 'discover-lend-id',
          component: DiscoverLendItem
        },
        {
          path: '/discover/borrow/:id',
          name: 'discover-borrow-id',
          component: DiscoverBorrowItem
        }
      ]
    }
  ]
})

export default router
