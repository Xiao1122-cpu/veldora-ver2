<template>
    <div class="container py-3">
        <h4>Quản lý Carousel / Slider</h4>
        <router-link to="/admin/carouselForm" class="btn btn-primary mb-3">
            Thêm Slider mới
        </router-link>

        <div class="table-responsive" style="max-height: 440px;">
            <table class="table table-striped align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Logo</th>
                        <th>Ảnh nền</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Liên kết</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in list" :key="p.id">
                        <td><img :src="p.logo" alt="" width="50" /></td>
                        <td><img :src="p.image" alt="" width="100" /></td>
                        <td>{{ p.title }}</td>
                        <td class="text-truncate" style="max-width: 120px;">{{ p.text }}</td>
                        <td class="text-truncate" style="max-width: 100px;">{{ p.link }}</td>
                        <td>
                            <span class="badge" :class="p.status ? 'bg-success' : 'bg-danger'">
                                {{ p.status ? "Hiển thị" : "Ẩn" }}
                            </span>
                        </td>
                        <td>
                            <router-link :to="`/admin/carouselForm/${p.id}`" class="btn btn-sm btn-warning me-2">
                                Sửa
                            </router-link>
                            <button class="btn btn-sm btn-danger" @click="deleteItem(p.id)">
                                Xóa
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const list = ref([]);

const getList = async () => {
    const res = await axios.get("https://veldora-ver2.onrender.com/carousel");
    list.value = res.data.reverse();
};

const deleteItem = async (id) => {
    if (confirm("Bạn có chắc muốn xóa ảnh này không?")) {
        await axios.delete(`https://veldora-ver2.onrender.com/carousel/${id}`);
        getList();
    }
};
onMounted(getList);
</script>

<style scoped>
.text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
