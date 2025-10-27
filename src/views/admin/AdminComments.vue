<template>
    <div class="container mt-4">
        <h4 class="mb-4">Quản lý bình luận</h4>

        <div class="card p-3 mb-4 shadow-sm">
            <div class="row g-2 align-items-center">
                <div class="col-md-4">
                    <input v-model="searchKeyword" type="text" class="form-control"
                        placeholder="Tìm bình luận hoặc người dùng..." />
                </div>
                <div class="col-md-8 text-end">
                    <button class="btn btn-success me-3" @click="resetFilter">Đặt lại</button>
                    <router-link to="/admin/news" class="btn btn-secondary">Quay Lại</router-link>
                </div>
            </div>
        </div>

        <div class="table-responsive shadow-sm">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Người dùng</th>
                        <th>Bình luận</th>
                        <th>Ngày đăng</th>
                        <th class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(c, index) in filteredComments" :key="c.id">
                        <td>{{ index + 1 }}</td>
                        <td><strong>{{ c.username }}</strong></td>
                        <td>{{ c.text }}</td>
                        <td>{{ formatDate(c.date) }}</td>
                        <td class="text-center">
                            <button class="btn btn-sm btn-outline-danger" @click="deleteComment(c.id)">
                                <i class="bi bi-trash"></i> Xóa
                            </button>
                        </td>
                    </tr>
                    <tr v-if="filteredComments.length === 0">
                        <td colspan="6" class="text-center text-muted py-4">
                            Không có bình luận nào được tìm thấy.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const comments = ref([]);
const newsList = ref([]);
const searchKeyword = ref("");
const filterNews = ref("");

const getComments = async () => {
    const res = await axios.get("http://localhost:3000/comments");
    comments.value = res.data.reverse();
};

const getNews = async () => {
    const res = await axios.get("http://localhost:3000/news");
    newsList.value = res.data;
};

onMounted(() => {
    getComments();
    getNews();
});

const deleteComment = async (id) => {
    if (confirm("Bạn có chắc muốn xóa bình luận này không?")) {
        await axios.delete(`http://localhost:3000/comments/${id}`);
        comments.value = comments.value.filter((c) => c.id !== id);
    }
};

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("vi-VN");
};

const filteredComments = computed(() => {
    return comments.value.filter((c) => {
        const matchKeyword =
            c.text.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
            c.username.toLowerCase().includes(searchKeyword.value.toLowerCase());
        const matchNews =
            !filterNews.value || c.newsId === parseInt(filterNews.value);
        return matchKeyword && matchNews;
    });
});

const resetFilter = () => {
    searchKeyword.value = "";
    filterNews.value = "";
};
</script>

<style scoped>
.table td {
    vertical-align: middle;
}

.table td .btn {
    min-width: 70px;
}

.card {
    border-radius: 10px;
}

.table-responsive {
    border-radius: 10px;
    overflow: hidden;
}

tbody tr:hover {
    background-color: #f8f9fa;
}
</style>
