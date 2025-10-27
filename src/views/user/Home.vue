<template>
    <div>
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="2000" v-for="p in carousel">
                    <img :src="p.image" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-md-block col-lg-4" style="bottom: 100px; left: 150px;">
                        <div class="col-lg-2">
                            <img :src="p.logo" class="img-fluid rounded" alt="" style="height: 100%;">
                        </div>
                        <h1 class="text-light text-start text-shadow">{{ p.title }}</h1>
                        <h1 class="text-light text-start text-shadow" style="font-size: 300%;">{{ p.text }}</h1>
                        <a :href="p.link" class="btn btn-dark btn-lg rounded-pill fw-bold" tabindex="-1" role="button"
                            aria-disabled="true" target="_blank">Xem Thêm</a>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="container mt-5">
            <div class="row p-3">
                <div class="row">
                    <div class="col-lg-10">
                        <h1 class="fw-bold">Thông Tin Mới Nhất</h1>
                    </div>
                    <div class="col-lg-2 mt-3 text-end">
                        <router-link to="/news" class="btn btn-outline-secondary btn-sm rounded-pill">Xem
                            Thêm</router-link>
                    </div>
                </div>
            </div>
            <div class="row p-3">
                <router-link :to="`/news/newsDetail/${p.id}`" class="col-lg-3 mt-4" v-for="p in visibleNews">
                    <div class="card text-white shadow-inset">
                        <div class="image-wrapper">
                            <img :src="p.image" class="card-img" alt="..." style="height: 350px; object-fit: cover;" />
                        </div>
                        <div class="card-img-overlay" style="top: 250px;">
                            <h5 class="card-title text-boder">{{ p.name }}</h5>
                            <p class="card-text text-boder truncate-2">{{ p.title }}</p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="parallax mt-5">
            <div class="logo"></div>
        </div>
        <div class="container mt-5">
            <h1>Sản Phẩm Của HoYoverse</h1>
            <div class="row mt-4">
                <div class="col-lg-6 mt-4" v-for="p in games">
                    <div class="card">
                        <img :src="p.image" class="card-img-top" alt="..." style="height: 300px; object-fit: cover;">
                        <div class="card-body bg-light" style="display: flex; height: 100px;">
                            <img :src="p.logo" class="d-block rounded" alt="..." width="70px" height="70px">
                            <div class="col-lg-8" style="margin-left: 20px;">
                                <h5 class="card-title">{{ p.name }}</h5>
                                <p class="card-text">{{ p.title }}
                                </p>
                            </div>
                            <div class="col-lg-4 mt-4">
                                <a :href="p.link" target="_blank" class="btn btn-dark text-end">Xem Thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="parallax2 mt-5 d-flex justify-content-center p-3">
            <div class="card bg-dark m-3" style="width: 18rem;">
                <div class="card-body">
                    <h2 class="card-title text-white ">Về HoYoverse</h2>
                    <div class="text-end">
                        <router-link to="/aboutHoYover" class="btn btn-primary rounded-pill" style="font-size: 30px;"><i
                                class="bi bi-arrow-right-circle-fill"></i></router-link>
                    </div>
                </div>
            </div>
            <div class="card bg-dark m-3" style="width: 18rem;">
                <div class="card-body">
                    <h2 class="card-title text-white ">Về HoYoverse</h2>
                    <div class="text-end">
                        <router-link to="/aboutHoyover" class="btn btn-primary rounded-pill" style="font-size: 30px;"><i
                                class="bi bi-arrow-right-circle-fill"></i></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const carousel = ref([]);
const news = ref([]);
const games = ref([]);

const visibleCount = ref(8);
const visibleNews = computed(() => news.value.slice(0, visibleCount.value));

const ListItem = async () => {
    const res = await axios.get("http://localhost:3000/carousel");
    carousel.value = res.data.filter(item => item.status === true);

    const listNews = await axios.get("http://localhost:3000/News");
    news.value = listNews.data

    const listGames = await axios.get("http://localhost:3000/listGames");
    games.value = listGames.data
}

window.addEventListener("scroll", () => {
    const parallax = document.querySelector(".parallax");
    const logo = document.querySelector(".logo");
  
    let rect = parallax.getBoundingClientRect();
  
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        let offset = window.scrollY - parallax.offsetTop;
        parallax.style.backgroundPosition = `center ${offset * 0.6}px`;
        logo.style.backgroundPosition = `center ${offset * 0.1}px`;
    }
});



onMounted(ListItem);
</script>

<style>
.image-wrapper {
    position: relative;
    overflow: hidden;
    /* 🧱 Giữ cho ảnh không tràn ra ngoài khi phóng to */
    border-radius: 10px;
    /* tuỳ chọn */
}

.image-wrapper img {
    transition: transform 0.4s ease;
    /* Mượt mà */
    width: 100%;
    display: block;
}

.image-wrapper:hover img {
    transform: scale(1.1);
    /* 🔍 Phóng to trong khung */
}


.image-wrapper::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
    pointer-events: none;
    border-radius: 10px;
}



.truncate-2 {
    display: -webkit-box;
    /* Dùng box layout */
    -webkit-line-clamp: 2;
    /* Số dòng muốn hiển thị */
    -webkit-box-orient: vertical;
    /* Hướng của box */
    overflow: hidden;
    /* Ẩn phần dư */
    text-overflow: ellipsis;
    /* Thêm dấu "..." */
}

.carousel-inner img {
    height: 695px;
    object-fit: cover;
}

.text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-boder {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.card-img-overlay {
    top: 240px;
}

.parallax2 {
    /* The image used */
    background-image: url("@/assets/image/star.jpg");

    /* Set a specific height */
    min-height: 200px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.parallax {
    /* The image used */
    background-image: url("@/assets/image/star.jpg");

    /* Set a specific height */
    min-height: 300px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 3000px;
    position: relative
}

.logo {
    background-image: url("@/assets/image/layer.png");
    /* Set a specific height */
    min-height: 300px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1100px;
    position: relative
}

/* Thêm CSS này vào trong thẻ <style> hiện tại */

/* --- Tối ưu cho thiết bị di động (Màn hình nhỏ hơn 768px) --- */
@media (max-width: 767.98px) {

    /* 1. Thanh điều hướng (Header) */
    header {
        position: static;
        /* Thay đổi fixed thành static trên mobile để không che nội dung */
        opacity: 1;
        /* Loại bỏ độ mờ khi không còn fixed */
    }

    /* Đảo ngược thứ tự các mục trong navbar trở lại bình thường trên mobile */
    .navbar-collapse.flex-row-reverse {
        flex-direction: column !important;
        align-items: flex-start;
    }

    .navbar-nav {
        width: 100%;
        /* Đảm bảo menu chiếm toàn bộ chiều rộng khi mở */
    }

    /* 2. Carousel (Slider) */
    .carousel-inner img {
        height: 300px;
        /* Giảm chiều cao hình ảnh trên mobile */
    }

    .carousel-caption {
        bottom: 20px;
        /* Đưa chú thích lên cao hơn */
        left: 10px;
        /* Đưa chú thích sang trái hơn */
        right: 10px;
        padding: 0;
        text-align: center !important;
    }

    .carousel-caption .col-lg-2 {
        margin: 0 auto 10px;
        /* Căn giữa logo */
        width: 30%;
    }

    .carousel-caption h1 {
        font-size: 1.5rem !important;
        /* Giảm kích thước tiêu đề lớn */
        text-align: center !important;
    }

    .carousel-caption h1:last-of-type {
        font-size: 1.2rem !important;
        /* Giảm kích thước tiêu đề phụ */
    }

    /* 3. Phần Tin Tức (Cards) */
    .container .row.p-3 {
        padding: 0 !important;
        /* Loại bỏ padding ngang lớn */
    }

    .col-lg-3,
    .col-lg-6 {
        margin-bottom: 15px;
        /* Thêm khoảng cách giữa các card khi xếp chồng */
    }

    .card-img-overlay {
        top: 150px;
        /* Điều chỉnh vị trí của overlay trên card nhỏ hơn */
    }

    .card-img-overlay h5 {
        font-size: 1.25rem;
    }

    .card-img-overlay p {
        font-size: 0.9rem;
    }

    /* 4. Hiệu ứng Parallax (Parallax sections) */
    .parallax,
    .parallax2,
    .logo {
        /* Vô hiệu hóa hiệu ứng parallax trên thiết bị di động vì nó có thể gây lag */
        background-attachment: scroll !important;
        min-height: 200px !important;
    }

    .logo {
        background-size: cover !important;
        /* Đảm bảo logo vẫn hiển thị */
    }

    /* 5. Phần Sản Phẩm (Product Cards) */
    .card-body[style*="display: flex;"] {
        flex-direction: column;
        /* Chuyển bố cục flex thành xếp chồng dọc */
        align-items: center;
        text-align: center;
    }

    .card-body img {
        margin-bottom: 10px;
    }

    .card-body .col-lg-8 {
        margin-left: 0 !important;
    }

    .card-body .col-lg-4.mt-4 {
        margin-top: 10px !important;
        width: 100%;
        /* Đảm bảo nút chiếm toàn bộ chiều rộng */
    }

    /* 6. Về HoYoverse & Trung Tâm Nạp */
    .parallax2.d-flex {
        flex-direction: column;
        /* Xếp chồng 2 card dọc */
    }

    .parallax2 .card {
        width: 90% !important;
        /* Chiếm gần hết chiều rộng */
    }
}

/* --- Tối ưu cho máy tính bảng (Màn hình từ 768px đến 991.98px) --- */
@media (min-width: 768px) and (max-width: 991.98px) {
    .carousel-inner img {
        height: 500px;
        /* Điều chỉnh chiều cao cho tablet */
    }

    .carousel-caption {
        left: 50px;
        bottom: 50px;
    }

    .card-img-overlay {
        top: 180px;
        /* Điều chỉnh vị trí overlay trên tablet */
    }

    /* Điều chỉnh cỡ chữ nhỏ hơn trên tablet */
    .carousel-caption h1 {
        font-size: 2.5rem !important;
    }

    .carousel-caption h1:last-of-type {
        font-size: 1.8rem !important;
    }
}
</style>