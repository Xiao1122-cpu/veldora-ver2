<template>
    <div>
        <Navbar></Navbar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Footer from '@/components/common/Footer.vue';
import Navbar from '@/components/common/Navbar.vue';
</script>

<style>
</style>