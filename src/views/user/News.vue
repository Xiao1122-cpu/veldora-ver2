<template>
    <div>
        <div class="parallax2 d-flex align-items-center justify-content-center">
            <h1 class="text-white fw-bold mt-5" style="font-size: 400%;">Tin Tức</h1>
        </div>
        <div class="container mt-5">
            <div class="main-container">
                <!-- Dùng transition-group để có hiệu ứng khi xuất hiện -->
                <transition-group name="fade-up" tag="div" class="row mt-4">
                    <router-link v-for="p in visibleNews" :key="p.id" :to="`/news/newsDetail/${p.id}`"
                        class="text-deco col-lg-6 mb-5">
                        <div class="card border-0 image-wrappe">
                            <img :src="p.image" class="card-img-top"
                                style="border-radius: 15px; height: 350px; object-fit: cover;" alt="..." />
                            <div class="card-body">
                                <div class="d-flex">
                                    <p class="me-4">{{ p.name }}</p>
                                    <p class="card-title">{{ p.date }}</p>
                                </div>
                                <h5 class="card-text truncate-2 text">{{ p.text }}</h5>
                            </div>
                        </div>
                    </router-link>
                </transition-group>
            </div>

            <div class="text-center p-3">
                <button v-if="visibleCount < news.length" type="button"
                    class="btn btn-outline-primary rounded-pill fs-3 px-5" @click="showMore">
                    Xem Thêm
                </button>
                <p v-else class="text-muted">Đã hiển thị tất cả tin tức</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const news = ref([]);
const visibleCount = ref(6);

const visibleNews = computed(() => news.value.slice(0, visibleCount.value));

const listNews = async () => {
    const res = await axios.get("https://veldora-ver2.onrender.com/News");
    news.value = res.data;
};

const showMore = () => {
    visibleCount.value += 6;
};

onMounted(listNews);
</script>

<style>
.image-wrappe {
    position: relative;
    overflow: hidden;
    /* 🧱 Giữ cho ảnh không tràn ra ngoài khi phóng to */
    border-radius: 10px;
    /* tuỳ chọn */
}

.image-wrappe img {
    transition: transform 0.4s ease;
    /* Mượt mà */
    width: 100%;
    display: block;
}

.image-wrappe:hover img {
    transform: scale(1.03);
    /* 🔍 Phóng to trong khung */
}

.truncate-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.text-deco:hover {
    text-decoration: underline;
}

.text-deco {
    text-decoration: none;
}

.text {
    white-space: pre-line;
    line-height: 1.8;
}

/* Hiệu ứng fade-in từ dưới lên */
.fade-up-enter-active {
    transition: all 0.5s ease;
}

.fade-up-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
}

.fade-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.fade-up-enter-to {
    opacity: 1;
    transform: translateY(0);
}

</style>
