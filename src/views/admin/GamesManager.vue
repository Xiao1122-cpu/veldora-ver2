<template>
    <div>
        <h3 class="mb-3"><i class="bi bi-controller"></i> Quản lý Game</h3>
        <router-link to="/admin/gamesForm" class="btn btn-primary mb-3">Thêm mới Game</router-link>
        <table class="table table-bordered table-hover text-center align-middle">
            <thead class="table-dark">
                <tr>
                    <th>Logo</th>
                    <th>Ảnh</th>
                    <th>Tên Game</th>
                    <th>Giới thiệu</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in games">
                    <td><img :src="p.logo" alt="" style="max-width:50px;"></td>
                    <td><img :src="p.image" style="max-width:100px;" class="rounded" alt="Game"></td>
                    <td>{{ p.name }}</td>
                    <td>{{ p.title }}</td>
                    <td><span class="badge" :class="p.status ? 'bg-success' : 'bg-danger'">{{ p.status ? "Hiển Thị" :
                        "Ẩn" }}</span></td>
                    <td>
                        <router-link :to="`/admin/gamesForm/${p.id}`" class="btn btn-warning btn-sm">Sửa</router-link>
                        <button class="btn btn-danger btn-sm" @click="deleteGames(p.id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const games = ref([])

const loadGames = async () => {
    const res = await axios.get("https://veldora-ver2.onrender.com/listGames")
    games.value = res.data;
}

const deleteGames = async (id) => {
    if (confirm("Bạn có chắc muốn xóa game này")) {
        await axios.delete(`https://veldora-ver2.onrender.com/listGames/${id}`)
        loadGames();
    }
}

onMounted(loadGames);
</script>

<style lang="scss" scoped></style>