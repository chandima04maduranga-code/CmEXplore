import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import ProductDetailView from '../views/productDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/shop', component: ShopView },
    { path: '/cart', component: CartView },
    { path: '/login', component: LoginView },
    { path: '/checkout', component: CheckoutView },
    { path: '/product/:id', component: ProductDetailView },
  ],
})

export default router