<template>
    <nav class="navbar navbar-light bg-light p-3 mb-3">
        <!-- Ô tìm kiếm -->
        <form class="d-flex w-50" @submit.prevent="handleSearch">
            <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Tìm kiếm..."
                aria-label="Search" />
            <button class="btn btn-outline-primary" type="submit">Tìm</button>
        </form>

        <!-- Khu vực thông báo + avatar + logout -->
        <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-secondary">
                <i class="bi bi-bell-fill"></i>
            </button>
            <img :src="logogl" class="rounded-circle" alt="Admin" style="width: 40px; height: 40px;" />

            <button class="btn btn-danger ms-2" @click="logout">
                <i class="bi bi-box-arrow-right"></i> Đăng xuất
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logogl from "@/assets/image/logoGl.jpeg";

const router = useRouter();
const searchQuery = ref(""); // Lưu nội dung nhập vào ô tìm kiếm

// Gửi sự kiện tìm kiếm ra component cha
// Đăng xuất
const logout = () => {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem("user");
        router.push("/");
    }
};
</script>
