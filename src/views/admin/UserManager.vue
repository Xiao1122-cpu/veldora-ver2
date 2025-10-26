<template>
    <div>
        <h3 class="mb-3"><i class="bi bi-people-fill"></i> Quản lý Người dùng</h3>

        <table class="table table-bordered table-hover text-center align-middle">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <span class="badge" :class="user.active ? 'bg-success' : 'bg-secondary'">
                            {{ user.active ? 'Khóa' : 'Hoạt động' }}
                        </span>
                    </td>
                    <td>
                        <button @click="editUser(user.id)" class="btn btn-warning btn-sm">Sửa</button>
                        <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Xóa</button>
                    </td>
                </tr>
                <tr v-if="users.length === 0">
                    <td colspan="6" class="text-muted">Không có người dùng nào</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);

const fetchUsers = async () => {
    try {
        const res = await axios.get('http://localhost:3000/user');
        users.value = res.data.reverse();
    } catch (err) {
        console.error('Lỗi khi fetch người dùng:', err);
        alert('Không thể tải danh sách người dùng!');
    }
};

const goAddUser = () => {
    router.push('/admin/users/add'); // chỉnh theo route bạn
};

const editUser = (id) => {
    router.push(`/admin/users/edit/${id}`); // chỉnh theo route bạn
};

const deleteUser = async (id) => {
    if (!confirm('Bạn có chắc muốn xoá người dùng này?')) return;
    try {
        await axios.delete(`http://localhost:3000/user/${id}`);
        alert('Xoá thành công!');
        fetchUsers();
    } catch (err) {
        console.error('Lỗi xoá người dùng:', err);
        alert('Không thể xoá người dùng!');
    }
};

onMounted(() => {
    fetchUsers();
});
</script>

<style>
</style>
