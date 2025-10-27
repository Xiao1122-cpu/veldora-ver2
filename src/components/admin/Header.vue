<template>
  <nav class="navbar navbar-light bg-light p-3 mb-3 shadow-sm">
    <!-- Ô tìm kiếm -->
    <form class="d-flex w-50" @submit.prevent="handleSearch">
      <input
        v-model="searchQuery"
        class="form-control me-2"
        type="search"
        placeholder="Tìm kiếm..."
        aria-label="Search"
      />
      <button class="btn btn-outline-primary" type="submit">Tìm</button>
    </form>

    <!-- Khu vực thông báo + avatar + logout -->
    <div class="d-flex align-items-center gap-3">
      <button class="btn btn-outline-secondary">
        <i class="bi bi-bell-fill"></i>
      </button>

      <!-- Avatar + Tên admin -->
      <div class="d-flex align-items-center gap-2">
        <img
          :src="adminInfo?.avatar || defaultAvatar"
          class="rounded-circle border"
          alt="Admin Avatar"
          style="width: 40px; height: 40px; object-fit: cover;"
        />
        <strong>{{ adminInfo?.name || 'Admin' }}</strong>
      </div>

      <button class="btn btn-danger ms-2" @click="logout">
        <i class="bi bi-box-arrow-right"></i> Đăng xuất
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import defaultAvatar from "@/assets/image/logoGl.jpeg"; // ảnh mặc định nếu admin chưa có avatar

const router = useRouter();
const searchQuery = ref("");
const adminInfo = ref(null);

const handleSearch = () => {
  // Bạn có thể emit sự kiện ra component cha hoặc điều hướng tới trang tìm kiếm
  console.log("Từ khóa tìm kiếm:", searchQuery.value);
};

// 🟢 Lấy thông tin admin khi vào trang
onMounted(() => {
  const storedAdmin = JSON.parse(localStorage.getItem("admin"));
  if (storedAdmin) {
    adminInfo.value = storedAdmin;
  }
});

// 🟢 Đăng xuất
const logout = () => {
  if (confirm("Bạn có chắc muốn đăng xuất?")) {
    localStorage.removeItem("admin");
    router.push("/login");
  }
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
