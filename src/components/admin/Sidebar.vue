<template>
    <nav class="col-md-2 d-md-block bg-dark text-white sidebar collapse vh-100" id="sidebarMenu">
        <div class="position-sticky pt-3 fw-bold">
            <img :src="logo" alt="" style="width: 90%;">
            <h5 class="px-3 text-center">Admin</h5>
            <ul class="nav flex-column mt-5">
                <router-link to="/admin" class="nav-link text-white" active-class="active">
                    <li class="">Dashboard</li>
                </router-link>
                <router-link to="/admin/carousel" class="nav-link text-white" active-class="active">
                    <li class="">Carousel</li>  
                </router-link>
                <router-link to="/admin/news" class="nav-link text-white" active-class="active">
                    <li class="">Tin tức</li>
                </router-link>
                <router-link to="/admin/games" class="nav-link text-white" active-class="active">
                    <li class="">Game</li>
                </router-link>
                <router-link to="/admin/product" class="nav-link text-white" active-class="active">
                    <li class="">Sản Phẩm</li>
                </router-link>
                <router-link to="/admin/users" class="nav-link text-white" active-class="active">
                    <li class="">Người Dùng</li>
                </router-link>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import logo from "@/assets/image/logo.png"
</script>

<style>
.sidebar{
    background-image: url("@/assets/image/star.jpg");
    background-size: cover;
}
</style>