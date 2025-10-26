<template>
    <div>
        <Navbar></Navbar>
        <div class="parallax2 d-flex align-items-center justify-content-center">
            <h1 class="text-white fw-bold mt-5" style="font-size: 300%;">Về HoYoverse</h1>
        </div>
        <div class="container mt-5 w-75">
            <h1 class="fw-bold">Về HoYoverse</h1>
            <div class="text mt-5 fs-5">
                <p>HoYoverse cam kết cung cấp trải nghiệm thế giới ảo sống động cho người chơi trên toàn thế giới. Chúng
                    tôi
                    đã mang đến cho người hâm mộ những game được yêu thích bao gồm Genshin Impact, Honkai: Star Rail,
                    Honkai
                    Impact 3, Tears of Themis và Zenless Zone Zero, cùng nhiều nội dung giải trí đa dạng.</p>
                <p>Cộng đồng là cốt lõi của mọi việc mà chúng tôi thực hiện. Chúng tôi nỗ lực thu hút người hâm mộ cũng
                    như
                    xây dựng một cộng đồng toàn cầu nhiệt tình và hòa nhập, mang đến khả năng tiếp cận và khuyến khích
                    mọi
                    người chia sẻ niềm đam mê với ACG (Hoạt hình, truyện tranh và game) thông qua khả năng sáng tạo và
                    kỹ
                    năng của họ.</p>
                <p>Phá vỡ giới hạn của trí tưởng tượng, chúng tôi liên tục khám phá các công nghệ phát triển game tiên
                    tiến
                    và đã tích lũy năng lực kỹ thuật hàng đầu trong lĩnh vực cel shading, cloud gaming và các lĩnh vực
                    khác.
                </p>
                <p>Trong tương lai, chúng tôi sẽ tiếp tục mở rộng nhiệm vụ sáng tạo nội dung, nghiên cứu công nghệ và
                    phát
                    hành thông qua hoạt động ở các văn phòng tại Singapore, Montreal, Los Angeles, Tokyo, Seoul và các
                    khu
                    vực khác.</p>
            </div>
            <div class="main-item">
                <div class="item">
                    <img src="@/assets/image/logoHK.jpeg" alt="">
                    <p>Hokai Impact 3</p>
                </div>
                <div class="item">
                    <img src="@/assets/image/logoGl.jpeg" alt="">
                    <p>Genshin Impact</p>
                </div>
                <div class="item">
                    <img src="@/assets/image/logoKB.jpg" alt="">
                    <p>Tears of Themis</p>
                </div>
                <div class="item">
                    <img src="@/assets/image/logoHR.png" alt="">
                    <p>Honkai: Star Rail</p>
                </div>
                <div class="item">
                    <img src="@/assets/image/logoZZZ.png" alt="">
                    <p>Zenless Zone Zero</p>
                </div>
            </div>
            <div class="main-item">
                <div class="items text-center" style="width: 100%;">
                    <img src="@/assets/image/logoHoyo.jpeg" alt="" style="border-radius: 20px;" width="20%">
                    <p>HoYoLAB</p>
                </div>
                <div class="itemx text-center mt-4" style="width: 100%;">
                    <img src="@/assets/image/logoHYM.jpg" alt="" width="60%">
                    <p>HOYO-MiX</p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '@/components/common/Footer.vue';
import Navbar from '@/components/common/Navbar.vue';
</script>

<style>
.nav-link {
    text-decoration: none;
    padding: 8px 12px;
    color: black;
}

.nav-link.active {
    border-bottom: 2px solid dodgerblue;
    color: dodgerblue;
}

header {
    position: fixed;
    z-index: 1000;
    opacity: 0.8;
    width: 100%;
}

.parallax2 {
    /* The image used */
    background-image: url("@/assets/image/star.jpg");

    /* Set a specific height */
    min-height: 300px;

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.main-item {
    display: flex;
}

.main-item .item {
    margin: 0px 4.5%;
    text-align: center;
}

.main-item .item>img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    margin: 20px 0px;
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

    /* 2. Banner/Parallax */
    .parallax2 {
        background-attachment: scroll !important;
        /* Vô hiệu hóa parallax trên mobile để tránh lỗi/lag */
        min-height: 200px;
        /* Giảm chiều cao */
    }

    .parallax2 h1 {
        font-size: 2rem !important;
        /* Giảm kích thước tiêu đề */
        margin-top: 10px !important;
        /* Điều chỉnh vị trí */
    }

    /* 3. Phần Nội dung chính */
    .container.w-75 {
        width: 95% !important;
        /* Mở rộng container để chiếm nhiều không gian hơn trên mobile */
        padding: 0 10px;
    }

    .text {
        font-size: 1rem !important;
        /* Giảm kích thước chữ trong đoạn văn */
    }

    /* 4. Phần Sản phẩm (Các logo game) */
    .main-item {
        display: block;
        /* Chuyển từ flex (ngang) sang block (xếp chồng dọc) */
    }

    .main-item .item {
        margin: 15px auto;
        /* Căn giữa và thêm khoảng cách giữa các item */
        width: 45%;
        /* Giới hạn chiều rộng của mỗi item để chúng có thể nằm cạnh nhau nếu muốn */
        display: inline-block;
        /* Cho phép 2 items nằm trên 1 hàng (nếu đủ chỗ) */
        vertical-align: top;
        /* Căn trên khi nằm cạnh nhau */
    }

    /* Tinh chỉnh cho 2 logo lớn cuối */
    .main-item:nth-child(2) {
        text-align: center;
        /* Căn giữa nội dung cho hàng thứ 2 */
    }
}
</style>