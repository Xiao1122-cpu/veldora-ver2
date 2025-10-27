<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <picture>
                        <img :src="img1" class="img-fluid" alt="logo" width="200" height="100" />
                    </picture>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse fs-4 flex-row-reverse" id="navbarNav">
                    <ul class="navbar-nav align-items-center">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link text-light" active-class="active">
                                Trang Chủ
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/news" class="nav-link text-light" active-class="active">
                                Tin Tức
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/aboutHoYover" class="nav-link text-light" active-class="active">
                                Về HoYoverse
                            </router-link>
                        </li>

                      
                        <li v-if="!isLoggedIn" class="nav-item">
                            <router-link to="/login" class="nav-link text-light" active-class="active">
                                Đăng Nhập
                            </router-link>
                        </li>

                       
                        <li v-else class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown"
                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img :src="user.avatar" alt="Avatar" class="rounded-circle me-2" width="35"
                                    height="35" />
                                <span>{{ user.email }}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li>
                                    <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import img1 from '@/assets/image/logo.png'

const router = useRouter()
const isLoggedIn = ref(false)
const user = ref({ email: ''})

onMounted(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
        const parsedUser = JSON.parse(userData)
        user.value = {
            email: parsedUser.email || 'Người dùng',
            avatar: parsedUser.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
        }
        isLoggedIn.value = true
    }
})

const logout = () => {
    localStorage.removeItem('user')
    isLoggedIn.value = false
    alert('Bạn đã đăng xuất thành công!')
    router.push('/login')
}
</script>

<style>
.nav-link {
    text-decoration: none;
    padding: 8px 12px;
    color: white;
}

.nav-link.active {
    border-bottom: 2px solid dodgerblue;
    color: dodgerblue;
}

header {
    position: fixed;
    z-index: 1000;
    opacity: 0.9;
    width: 100%;
}

.dropdown-toggle img {
    object-fit: cover;
}
</style>
