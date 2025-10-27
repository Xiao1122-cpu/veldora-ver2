<template>
    <div class="container my-5 py-5" style="max-width: 700px;">
        <h2 class="text-center mb-4">Thông tin cá nhân</h2>

        <div class="card shadow-sm">
            <div class="card-body">
                <div class="text-center mb-4">
                    <img :src="user.avatar" alt="Avatar" class="rounded-circle shadow" width="120" height="120" />
                    <div class="mt-3">
                        <input type="file" class="form-control w-50 mx-auto" @change="handleAvatarChange" accept="image/*" />
                    </div>
                </div>

                <form @submit.prevent="saveProfile">
                    <div class="mb-3">
                        <label class="form-label">Họ và tên</label>
                        <input type="text" v-model="user.name" class="form-control" required />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" v-model="user.email" class="form-control" required />
                    </div>

                    <div class="d-flex justify-content-end gap-2">
                        <router-link to="/" class="btn btn-secondary">Trở về</router-link>
                        <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const user = ref({
    name: '',
    email: '',
    avatar: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
})

onMounted(() => {
    const data = localStorage.getItem('user')
    if (data) {
        user.value = JSON.parse(data)
    }
})

// Đổi avatar
const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
            user.value.avatar = event.target.result
        }
        reader.readAsDataURL(file)
    }
}

// Lưu thông tin
const saveProfile = () => {
    localStorage.setItem('user', JSON.stringify(user.value))
    alert('Cập nhật thông tin thành công!')
}
</script>

<style scoped>
.card {
    border-radius: 12px;
}
img {
    object-fit: cover;
}
</style>
