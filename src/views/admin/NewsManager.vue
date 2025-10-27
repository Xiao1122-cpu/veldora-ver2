<template>
    <div>
        <h4 class="fw-bold mb-1">Quản lý Tin tức / Bài viết</h4>
        <p class="text-secondary mb-3">Thêm, sửa, xóa và theo dõi tương tác bài viết</p>

        <router-link to="/admin/newsForm" class="btn btn-primary mb-3">
            <i class="bi bi-plus-circle"></i> Thêm bài viết mới
        </router-link>

        <div class="table-responsive" style="max-height: 480px; overflow-y: auto;">
            <table class="table table-striped align-middle">
                <thead class="table-dark sticky-top">
                    <tr class="text-center">
                        <th>Ảnh</th>
                        <th>Tên trò chơi</th>
                        <th>Tiêu đề</th>
                        <th>Lượt thích</th>
                        <th>Bình luận</th>
                        <th>Ngày đăng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in news" :key="p.id" class="text-center">
                        <td>
                            <img :src="p.image" alt="news-img" class="rounded"
                                style="width: 100px; height: 60px; object-fit: cover;" />
                        </td>
                        <td class="fw-semibold">{{ p.name }}</td>
                        <td class="text-truncate" style="max-width: 200px;">{{ p.title }}</td>
                        <td><i class="bi bi-heart-fill text-danger me-1"></i>{{ p.likesCount || 0 }}</td>
                        <td>
                            <i class="bi bi-chat-dots-fill text-primary me-1"></i>{{ p.commentsCount || 0 }}
                            <router-link :to="`/admin/comments?newsId=${p.id}`"
                                class="btn btn-sm btn-outline-primary ms-2" title="Xem bình luận bài viết">
                                <i class="bi bi-eye"></i>
                            </router-link>
                        </td>
                        <td>{{ p.date }}</td>
                        <td>
                            <span class="badge" :class="p.status ? 'bg-success' : 'bg-danger'">
                                {{ p.status ? 'Hiển Thị' : 'Ẩn' }}
                            </span>
                        </td>
                        <td>
                            <div class="d-flex justify-content-center gap-2">
                                <router-link :to="`/admin/newsForm/${p.id}`" class="btn btn-sm btn-warning"
                                    title="Chỉnh sửa bài viết">
                                    Sửa
                                </router-link>
                                <button class="btn btn-sm btn-danger" title="Xóa bài viết" @click="deleteNews(p.id)">
                                    Xóa
                                </button>
                            </div>
                        </td>
                    </tr>

                    <tr v-if="news.length === 0">
                        <td colspan="9" class="text-center text-muted py-4">Không có bài viết nào</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const news = ref([])

const loadNews = async () => {
    const res = await axios.get('http://localhost:3000/News')
    const comments = await axios.get('http://localhost:3000/comments')
    const likes = await axios.get('http://localhost:3000/likes')

    news.value = res.data.map((item) => {
        const newsComments = comments.data.filter((c) => c.newsId === item.id)
        const newsLikes = likes.data.filter((l) => l.newsId === item.id)
        return {
            ...item,
            commentsCount: newsComments.length,
            likesCount: newsLikes.length,
        }
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
}

const deleteNews = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa tin tức này không?')) {
        await axios.delete(`http://localhost:3000/News/${id}`)
        loadNews()
    }
}

onMounted(loadNews)
</script>

<style scoped>
.table-responsive {
    border: 1px solid #dee2e6;
    border-radius: 8px;
}

.table th,
.table td {
    vertical-align: middle;
}

.table thead th {
    position: sticky;
    top: 0;
    background: #212529 !important;
    color: #fff;
    z-index: 1;
}

.text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
