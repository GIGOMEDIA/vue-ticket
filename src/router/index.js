import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import TicketManagement from '../views/TicketManagement.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'Tickets', component: TicketManagement, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ticketapp_session')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    next('/home') // redirect logged-in users
  } else {
    next()
  }
})

export default router




