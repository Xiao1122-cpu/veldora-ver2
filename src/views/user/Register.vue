<template>
    <Navbar></Navbar>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 bg-light text-center d-flex align-items-center">
                <div class="mx-auto">
                    <img src="@/assets/image/logo2.png" alt="" style="width: 200px;">
                    <p>Dùng để đăng ký tài khoản trên trang web</p>
                </div>
            </div>
            <div class="col-lg-8 mt-5">
                <div class="modal-body mx-4" style="margin-top: 100px;">
                    <div class="text-center mb-5">
                        <h2 class="modal-title">Đăng Ký Tài Khoản</h2>
                    </div>

                    <!-- 🟢 Thông báo -->
                    <p v-if="message" :class="{ 'text-success': success, 'text-danger': !success }"
                        class="text-center mb-3 fw-bold">
                        {{ message }}
                    </p>

                    <form class="text-center" @submit.prevent="registerUser">
                        <div class="mb-3">
                            <input v-model="username" type="text" class="form-control p-3 bg-light"
                                placeholder="Tên Người Dùng" style="border-radius: 10px;">
                        </div>
                        <div class="mb-3">
                            <input v-model="email" type="email" class="form-control p-3 bg-light" placeholder="Email"
                                style="border-radius: 10px;">
                        </div>
                        <div class="mb-3">
                            <input v-model="password" type="password" class="form-control p-3 bg-light"
                                placeholder="Mật Khẩu" style="border-radius: 10px;">
                        </div>
                        <button class="btn btn-primary px-5 w-100 mt-4 p-3" style="border-radius: 10px;" type="submit">
                            Đăng Ký
                        </button>
                    </form>

                    <div class="d-flex justify-content-between">
                        <div class="text-end p-3">
                            <router-link to="/login">Đã có tài khoản? Đăng nhập</router-link>
                        </div>
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

const username = ref('')
const email = ref('')
const password = ref('')
const message = ref('')
const success = ref(false)
const router = useRouter()

// 🟢 Hàm đăng ký tài khoản
const registerUser = async () => {
    message.value = ''
    success.value = false

    if (!username.value || !email.value || !password.value) {
        message.value = 'Vui lòng nhập đầy đủ thông tin!'
        return
    }

    try {
        // Lấy danh sách user từ JSON Server
        const res = await fetch('http://localhost:3000/user')
        const users = await res.json()

        // Kiểm tra trùng email
        const exists = users.some(u => u.email === email.value)
        if (exists) {
            message.value = 'Email đã được sử dụng!'
            return
        }

        // Gửi dữ liệu đăng ký
        const newUser = {
            id: Date.now(),
            username: username.value,
            email: email.value,
            password: password.value,
            role: 'user'
        }

        await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })

        success.value = true
        message.value = 'Đăng ký thành công! Chuyển đến trang đăng nhập...'

        // Chờ 1 chút rồi chuyển hướng
        setTimeout(() => {
            router.push('/login')
        }, 1000)
    } catch (error) {
        console.error('Lỗi đăng ký:', error)
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
