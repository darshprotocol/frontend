import { createRouter, createWebHistory } from 'vue-router'

import AppView from '../views/AppView.vue'
import HomeView from '../views/HomeView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import VaultView from '../views/VaultView.vue'
import ProfileView from '../views/ProfileView.vue'

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

import VaultLendItem from '../components/app/portfolio/vault/lends/VaultLendItem.vue'
import VaultBorrowItem from '../components/app/portfolio/vault/borrows/VaultBorrowItem.vue'

import DashBoardItem from '../components/app/dashboard/DashBoardItem.vue'

import ProfileLend from '../components/app/profile/ProfileLend.vue'
import ProfileBorrow from '../components/app/profile/ProfileBorrow.vue'

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
          name: 'portfolio-lends',
          component: PortfolioView,
          children: [
            {
              path: '/portfolio',
              name: 'portfolio-lends',
              component: PortfolioLend
            },
            {
              path: '/portfolio/borrows',
              name: 'portfolio-borrows',
              component: PortfolioBorrow
            },
            {
              path: '/portfolio/vaults',
              name: 'portfolio-vaults',
              component: PortfolioVault
            }
          ]
        },
        {
          path: '/portfolio/vaults',
          name: 'vaults',
          component: VaultView,
          children: [
            {
              path: '/portfolio/vaults/lends/:id',
              name: 'portfolio-vaults-lends-id',
              component: VaultLendItem
            },
            {
              path: '/portfolio/vaults/borrows/:id',
              name: 'portfolio-vaults-borrows-id',
              component: VaultBorrowItem
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
          path: '/portfolio/borrows/create',
          name: 'portfolio-borrow-create',
          component: CreateBorrowOffer
        },
        {
          path: '/portfolio/lends/create',
          name: 'portfolio-lends-create',
          component: CreateLendOffer
        },
        {
          path: '/portfolio/lends/:id',
          name: 'portfolio-lends-id',
          component: PortfolioLendItem
        },
        {
          path: '/portfolio/borrows/:id',
          name: 'portfolio-borrows-id',
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
        },
        {
          path: '/profile/:address',
          name: 'profile',
          component: ProfileView,
          children: [
            {
              path: '/profile/:address',
              name: 'profile-lends',
              component: ProfileLend
            },
            {
              path: '/profile/:address/borrows',
              name: 'profile-borrows',
              component: ProfileBorrow
            }
          ]
        }
      ]
    }
  ]
})

export default router
