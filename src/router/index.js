import { createRouter, createWebHistory } from 'vue-router'

import AppView from '../views/AppView.vue'
import HomeView from '../views/HomeView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import VaultView from '../views/VaultView.vue'

import DiscoverLend from '../components/app/discover/lend/DiscoverLend.vue'
import DiscoverBorrow from '../components/app/discover/borrow/DiscoverBorrow.vue'
import DiscoverStake from '../components/app/discover/stake/DiscoverStake.vue'

import PortfolioLend from '../components/app/portfolio/lend/PortfolioLend.vue'
import PortfolioBorrow from '../components/app/portfolio/borrow/PortfolioBorrow.vue'
import PortfolioStake from '../components/app/portfolio/stake/PortfolioStake.vue'

import DiscoverLendItem from '../components/app/discover/lend/DiscoverLendItem.vue'
import DiscoverBorrowItem from '../components/app/discover/borrow/DiscoverBorrowItem.vue'

import CreateBorrowOffer from '../components/app/portfolio/CreateBorrowOffer.vue'
import CreateLendOffer from '../components/app/portfolio/CreateLendOffer.vue'

import PortfolioLendItem from '../components/app/portfolio/lend/PortfolioLendItem.vue'
import PortfolioBorrowItem from '../components/app/portfolio/borrow/PortfolioBorrowItem.vue'

import VaultItem from '../components/app/vault/VaultItem.vue'

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
            },
            {
              path: '/discover/stake',
              name: 'discover-stake',
              component: DiscoverStake
            }
          ]
        },
        {
          path: '/portfolio',
          name: 'portfolio-lend',
          component: PortfolioView,
          children: [
            {
              path: '/portfolio',
              name: 'portfolio-lend',
              component: PortfolioLend
            },
            {
              path: '/portfolio/borrow',
              name: 'portfolio-borrow',
              component: PortfolioBorrow
            },
            {
              path: '/portfolio/stake',
              name: 'portfolio-stake',
              component: PortfolioStake
            }
          ]
        },
        {
          path: '/vault',
          name: 'vault',
          component: VaultView,
          children: [
            {
              path: '/vault/:id',
              name: 'portfolio-vault-id',
              component: VaultItem
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
        },
        {
          path: '/portfolio/borrow/create',
          name: 'portfolio-borrow-create',
          component: CreateBorrowOffer
        },
        {
          path: '/portfolio/lend/create',
          name: 'portfolio-lend-create',
          component: CreateLendOffer
        },{
          path: '/portfolio/lend/:id',
          name: 'portfolio-lend-id',
          component: PortfolioLendItem
        },{
          path: '/portfolio/borrow/:id',
          name: 'portfolio-borrow-id',
          component: PortfolioBorrowItem
        }
      ]
    }
  ]
})

export default router
