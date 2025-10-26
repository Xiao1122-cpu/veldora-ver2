import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import NewsLayouat from '@/layouts/NewsLayouat.vue'

// Admin views
import Dashboard from '@/views/admin/Dashboard.vue'
import CarouselManager from '@/views/admin/CarouselManager.vue'
import NewsManager from '@/views/admin/NewsManager.vue'
import GamesManager from '@/views/admin/GamesManager.vue'
import ProductManager from '@/views/admin/ProductManager.vue'
import UserManager from '@/views/admin/UserManager.vue'
import CarouselForm from '@/components/pages/CarouselForm.vue'
import NewsForm from '@/components/pages/NewsForm.vue'
import GamesForm from '@/components/pages/GamesForm.vue'

// User views
import Home from '@/views/user/Home.vue'
import News from '@/views/user/News.vue'
import NewsDetail from '@/views/user/NewsDetail.vue'
import AboutHoyoVer from '@/views/user/AboutHoyoVer.vue'
import Login from '@/views/user/Login.vue'
import Register from '@/views/user/Register.vue'

const routes = [
  // ==================== ADMIN ====================
  {
    path: '/admin',
    name: 'adminlayout',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: '', name: 'dashboard', component: Dashboard },
      { path: 'carousel', component: CarouselManager },
      { path: 'carouselForm', component: CarouselForm },
      { path: 'carouselForm/:id', component: CarouselForm },
      { path: 'news', component: NewsManager },
      { path: 'newsForm', component: NewsForm },
      { path: 'newsForm/:id', component: NewsForm },
      { path: 'games', component: GamesManager },
      { path: 'gamesForm', component: GamesForm },
      { path: 'gamesForm/:id', component: GamesForm },
      { path: 'product', component: ProductManager },
      { path: 'users', component: UserManager },
    ],
  },

  // ==================== USER SITE ====================
  {
    path: '/',
    name: 'userlayout',
    component: UserLayout,
    children: [
      { path: '', name: 'home', component: Home },
    ],
  },
  {
    path: '/news',
    name: 'news',
    component: NewsLayouat,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: News },
      { path: 'newsDetail/:id', component: NewsDetail },
    ],
  },
  {
    path: '/aboutHoyover',
    name: 'aboutHoyover',
    component: AboutHoyoVer,
  },

  // ==================== AUTH ====================
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ==================== ROUTE GUARD ====================
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const admin = JSON.parse(localStorage.getItem('admin'))

  // 🟢 1. Nếu route cần admin
  if (to.meta.requiresAdmin) {
    if (!admin) {
      alert('Vui lòng đăng nhập quản trị!')
      return next('/login')
    }
    if (admin.role !== 'admin') {
      alert('Bạn không có quyền truy cập!')
      return next('/')
    }
  }

  // 🟢 2. Nếu route cần người dùng (user)
  if (to.meta.requiresAuth && !user) {
    alert('Vui lòng đăng nhập để tiếp tục!')
    localStorage.setItem('redirectAfterLogin', to.fullPath)
    return next('/login')
  }

  // 🟢 3. Nếu admin đăng nhập → user site KHÔNG coi là đang đăng nhập
  // (tức là không ảnh hưởng trang chủ)
  if (to.path.startsWith('/') && !to.path.startsWith('/admin')) {
    // ở trang user thì không xóa admin, chỉ tách biệt session
    // => user vẫn là user, admin vẫn là admin, độc lập
  }

  next()
})

export default router
