<template>
    <footer class="footer bg-dark text-light pt-5 pb-3">
        <div class="container">
            <div class="row gy-4">

                <div class="col-md-3 text-center text-md-start">
                    <img :src="img1" alt="Logo" class="footer-logo mb-3" />
                    <h5 class="fw-bold">PC10136 - Thạch Văn Bạch</h5>
                    <p class="text-light">
                        Công Ty Trách Nhiệm Một Thành Viên
                    </p>
                </div>


                <div class="col-md-3 text-center text-md-end">
                    <h5 class="fw-bold mb-3">Liên hệ</h5>
                    <p class="small text-light mb-1">
                        <i class="bi bi-envelope"></i> 01228116641a@gmail.com
                    </p>
                    <p class="small text-light mb-1">
                        <i class="bi bi-geo-alt"></i>
                    </p>
                    <div class="social-icons mt-3">
                        <a href="#" class="me-3"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="me-3"><i class="bi bi-youtube"></i></a>
                        <a href="#" class="me-3"><i class="bi bi-instagram"></i></a>
                        <a href="#"><i class="bi bi-discord"></i></a>
                    </div>
                </div>


                <div class="col-md-6 text-center text-md-start">
                    <h5 class="fw-bold mb-3">Theo dõi chúng tôi</h5>
                    <div id="fb-root">
                        <p>
                            Chào mừng bạn đến với MiHoYo News & Store — nền tảng tổng hợp thông tin và sản phẩm chính
                            thức của MiHoYo!
                            Tại đây, bạn có thể dễ dàng cập nhật tin tức mới nhất, sự kiện đặc biệt, và ra mắt sản phẩm
                            từ các tựa game đình đám như Genshin Impact, Honkai: Star Rail, Honkai Impact 3rd và nhiều
                            dự án hấp dẫn khác.
                        </p>
                    </div>
                </div>
            </div>

            <hr class="bg-secondary my-4" />
            <div class="text-center small text-secondary">
                PC10136 - Thạch Văn Bạch
            </div>
        </div>
    </footer>
</template>

<script setup>
import { onMounted } from 'vue';
import img1 from '@/assets/image/logo.png';
</script>

<style scoped>
.footer {
    background-image: url("@/assets/image/star.jpg");
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: -1;
    }

    .footer-logo {
        width: 180px;
        border-radius: 10px;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }

    .footer-link {
        color: #ccc;
        text-decoration: none;
        display: block;
        padding: 5px 0;
        transition: color 0.3s ease;

        &:hover {
            color: #fff;
        }
    }

    .router-link-active {
        color: #ff4040 !important;
        font-weight: bold;
    }

    .social-icons {
        a {
            font-size: 1.5rem;
            color: #ccc;
            transition: color 0.3s ease, transform 0.3s ease;

            &:hover {
                color: #ff4040;
                transform: scale(1.1);
            }
        }
    }

    hr {
        opacity: 0.2;
    }
}
</style>
