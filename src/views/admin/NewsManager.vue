<template>
    <div>
        <h4>Quản lý Tin tức / Bài viết</h4>
        <p>Thêm / sửa / xóa bài viết</p>
        <router-link to="/admin/newsForm" class="btn btn-primary mb-3">Thêm bài viết mới</router-link>
        <div class="table-responsive" style="height: 440px;">
            <table class="table table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>Ảnh đại diện</th>
                        <th>Tên trò chơi</th>
                        <th>Tiêu đề</th>
                        <th>Nội Dung</th>
                        <th>Ngày đăng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in news" :key="p.id">
                        <td><img :src="p.image" alt="news1" style="max-width:100px;"></td>
                        <td>{{ p.name }}</td>
                        <td class="text-truncate" style="max-width: 150px;">{{ p.title }}</td>
                        <td class="text-truncate" style="max-width: 150px;">{{ p.text }}</td>
                        <td>{{ p.date }}</td>
                        <td><span class="badge" :class="p.status ? 'bg-success' : 'bg-danger'">{{ p.status ? "Hiển Thị" : "Ẩn" }}</span></td>
                        <td>
                            <router-link :to="`/admin/newsForm/${p.id}`" class="btn btn-sm btn-warning">Sửa</router-link>
                            <button class="btn btn-sm btn-danger" @click="deleteNews(p.id)">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const news = ref([]);

const loadNews = async () => {
    const res = await axios.get("http://localhost:3000/News");
    news.value = res.data;
}

const deleteNews = async (id) => {
    if (confirm("Bạn có muốn xóa tin tức này không")) {
        await axios.delete(`http://localhost:3000/News/${id}`);
        loadNews();
    }
}
onMounted(loadNews);
</script>

<style lang="scss" scoped></style>