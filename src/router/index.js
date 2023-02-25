import { createRouter, createWebHistory } from 'vue-router'

import AppView from '../views/AppView.vue'
import HomeView from '../views/HomeView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import VaultView from '../views/VaultView.vue'

import FaucetPage from '../components/app/FaucetPage.vue'

import DiscoverLender from '../components/app/discover/lenders/DiscoverLender.vue'
import DiscoverBorrower from '../components/app/discover/borrowers/DiscoverBorrower.vue'

import StakePage from '../components/app/stake/StakePage.vue'

import PortfolioLend from '../components/app/portfolio/lend/PortfolioLend.vue'
import PortfolioBorrow from '../components/app/portfolio/borrow/PortfolioBorrow.vue'

import DiscoverLendItem from '../components/app/discover/lenders/DiscoverLendItem.vue'
import DiscoverBorrowItem from '../components/app/discover/borrowers/DiscoverBorrowItem.vue'

import CreateBorrowOffer from '../components/app/portfolio/borrow/CreateBorrowOffer.vue'
import CreateLendOffer from '../components/app/portfolio/lend/CreateLendOffer.vue'

import PortfolioLendItem from '../components/app/portfolio/lend/PortfolioLendItem.vue'
import PortfolioBorrowItem from '../components/app/portfolio/borrow/PortfolioBorrowItem.vue'

import PortfolioVault from '../components/app/portfolio/vault/PortfolioVault.vue'
import VaultItem from '../components/app/vault/VaultItem.vue'

import DashBoardItem from '../components/app/dashboard/DashBoardItem.vue'

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
              component: DiscoverLender
            },
            {
              path: '/discover/borrowers',
              name: 'discover-borrow',
              component: DiscoverBorrower
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
              path: '/portfolio/vault/',
              name: 'portfolio-vault',
              component: PortfolioVault
            }
          ]
        },
        {
          path: '/portfolio/vault',
          name: 'vault',
          component: VaultView,
          children: [
            {
              path: '/portfolio/vault/:id',
              name: 'portfolio-vault-id',
              component: VaultItem
            }
          ]
        },
        {
          path: '/discover/lenders/:id',
          name: 'discover-lend-id',
          component: DiscoverLendItem
        },
        {
          path: '/discover/borrowers/:id',
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
        },
        {
          path: '/portfolio/lend/:id',
          name: 'portfolio-lend-id',
          component: PortfolioLendItem
        },
        {
          path: '/portfolio/borrow/:id',
          name: 'portfolio-borrow-id',
          component: PortfolioBorrowItem
        },
        {
          path: '/faucet',
          name: 'faucet',
          component: FaucetPage
        },
        {
          path: '/darshboard',
          name: 'darshboard',
          component: DashBoardItem
        },
        {
          path: '/stake',
          name: 'stake',
          component: StakePage
        }
      ]
    }
  ]
})

export default router
