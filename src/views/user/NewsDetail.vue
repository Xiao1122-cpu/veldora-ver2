<template>
    <div class="backgound-dark">
    </div>
    <div class="container w-75" style="margin-top: 50px;">
        <router-link to="/news" class="text-deco"><i class="bi bi-arrow-left-circle fs-1"></i> Quay Lại</router-link>
        <div class="main-container mx-auto w-75" v-if="newsDetail">
            <h1 class="text-center">{{ newsDetail.title }}</h1>
            <p id="date" class="text-center text-secondary">{{ newsDetail.date }}</p>
            <div class="hr-color"></div>
            <img :src="newsDetail.image" alt="" class="w-100 mt-4" style="height: 400px;">
            <div class="text mt-5 fs-5 mb-5">{{ newsDetail.text }}</div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const newsDetail = ref(null);
const route = useRoute();

onMounted(async() =>{
    const id = route.params.id;
    const res = await axios.get(`https://veldora-ver2.onrender.com/News/${id}`);
    newsDetail.value = res.data;
});
</script>

<style>
.backgound-dark {
    background-image: url(@/assets/image/star.jpg);
    width: auto;
    height: 75px;
}

.hr-color {
    background-image: url(@/assets/image/star.jpg);
    width: auto;
    height: 5px;
    border-radius: 10px;
}
.text-deco{
    text-decoration: none;
}
</style>