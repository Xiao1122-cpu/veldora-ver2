<template>
    <Navbar></Navbar>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 bg-light text-center d-flex align-items-center">
                <div class="mx-auto">
                    <img src="@/assets/image/logo2.png" alt="" style="width: 200px;">
                    <p>Dùng để đăng nhập trang web</p>
                </div>
            </div>
            <div class="col-lg-8 mt-5">
                <div class="modal-body mx-4" style="margin-top: 100px;">
                    <div class="text-center mb-5">
                        <h2 class="modal-title">Đăng Nhập Tài Khoản</h2>
                    </div>
                    <!-- 🟢 Thông báo -->
                    <p v-if="message" :class="{ 'text-success': success, 'text-danger': !success }"
                        class="text-center mb-3 fw-bold">
                        {{ message }}
                    </p>

                    <form class="text-center" @submit.prevent="loginUser">
                        <div class="mb-3">
                            <input v-model="email" type="email" class="form-control p-3 bg-light" id="email"
                                placeholder="Tên Người Dùng/Email" style="border-radius: 10px;">
                        </div>
                        <div class="mb-3">
                            <input v-model="password" type="password" class="form-control p-3 bg-light" id="password"
                                placeholder="Mật Khẩu" style="border-radius: 10px;">
                        </div>
                        <button class="btn btn-primary px-5 w-100 mt-4 p-3" style="border-radius: 10px;" type="submit">
                            Đăng Nhập
                        </button>
                    </form>
                    <div class="d-flex justify-content-between">
                        <div class="text-end p-3">
                            <a href="#">Quên Mật Khẩu</a>
                        </div>
                        <router-link to="/register" class="text-end p-3">Đăng Ký Ngay</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/common/Navbar.vue'

const email = ref('')
const password = ref('')
const message = ref('')
const success = ref(false)
const router = useRouter()

const loginUser = async () => {
    message.value = ''
    if (!email.value || !password.value) {
        message.value = 'Vui lòng nhập đầy đủ thông tin!'
        success.value = false
        return
    }

    try {
        const res = await fetch('http://localhost:3000/user')
        const users = await res.json()

        const user = users.find(u =>
            (u.email === email.value || u.username === email.value) &&
            u.password === password.value
        )

        if (user) {
            success.value = true
            message.value = 'Đăng nhập thành công!'

            // 🔹 Tách biệt session giữa admin và user
            if (user.role === 'admin') {
                // Lưu riêng cho admin
                localStorage.setItem('admin', JSON.stringify(user))
                localStorage.removeItem('user') // xoá session user nếu có
            } else {
                // Lưu riêng cho user
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.removeItem('admin') // xoá session admin nếu có
            }

            // Chuyển hướng sau 1 giây
            setTimeout(() => {
                const redirect = localStorage.getItem('redirectAfterLogin')
                localStorage.removeItem('redirectAfterLogin')

                if (user.role === 'admin') {
                    router.push('/admin')
                } else if (redirect) {
                    router.push(redirect)
                } else {
                    router.push('/')
                }
            }, 1000)
        } else {
            message.value = 'Sai email hoặc mật khẩu!'
            success.value = false
        }
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error)
        message.value = 'Không thể kết nối đến máy chủ!'
        success.value = false
    }
}
</script>


<style scoped>
.col-lg-4 {
    position: relative;
    overflow: hidden;
    z-index: 0;
    height: 680px;
}

.col-lg-4::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("@/assets/image/background.png") center/110% no-repeat;
    filter: blur(2px);
    z-index: 1;
}

.col-lg-4 .mx-auto {
    position: relative;
    z-index: 2;
}
</style>
