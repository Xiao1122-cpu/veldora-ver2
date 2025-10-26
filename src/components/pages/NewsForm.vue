<template>
    <div class="container">
        <div class="main-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ isEdit ? "Cập nhật Tin Tức" : "Thêm Tin Tức" }}</h5>
            </div>

            <div class="modal-body form-scroll">
                <form @submit.prevent="saveNews">
                    <!-- Tên -->
                    <div class="mb-3">
                        <label class="form-label">Tên Trò Chơi</label>
                        <input type="text" class="form-control" v-model="listNews.name" @input="clearError('name')" />
                        <small v-if="errors.name" class="text-danger d-block mt-1">{{ errors.name }}</small>
                    </div>

                    <!-- Tiêu đề -->
                    <div class="mb-3">
                        <label class="form-label">Tiêu Đề</label>
                        <input type="text" class="form-control" v-model="listNews.title" @input="clearError('title')" />
                        <small v-if="errors.title" class="text-danger d-block mt-1">{{ errors.title }}</small>
                    </div>

                    <!-- Nội dung -->
                    <div class="mb-3">
                        <label class="form-label">Nội Dung</label>
                        <textarea class="form-control" rows="4" v-model="listNews.text"
                            @input="clearError('text')"></textarea>
                        <small v-if="errors.text" class="text-danger d-block mt-1">{{ errors.text }}</small>
                    </div>

                    <!-- Ngày đăng -->
                    <div class="mb-3">
                        <label class="form-label">Ngày Đăng</label>
                        <input type="date" class="form-control" v-model="listNews.date" @change="clearError('date')" />
                        <small v-if="errors.date" class="text-danger d-block mt-1">{{ errors.date }}</small>
                    </div>

                    <!-- Trạng thái -->
                    <div class="mb-3">
                        <label class="form-label d-block">Trạng thái</label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="true" v-model="listNews.status"
                                @change="clearError('status')" checked/>
                            <label class="form-check-label">Hiển Thị</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="false" v-model="listNews.status"
                                @change="clearError('status')" />
                            <label class="form-check-label">Ẩn</label>
                        </div>
                    </div>

                    <!-- Ảnh -->
                    <div class="mb-3">
                        <label class="form-label">Ảnh</label>
                        <input type="file" class="form-control" @change="uploadImage" accept="image/*" />
                        <small v-if="errors.image" class="text-danger d-block mt-1">{{ errors.image }}</small>
                    </div>

                    <div v-if="listNews.image" class="mb-3 text-center">
                        <img :src="listNews.image" class="img-thumbnail"
                            style="width:150px; height:150px; object-fit:cover;" />
                    </div>

                    <!-- Buttons -->
                    <div class="modal-footer d-flex justify-content-end gap-2">
                        <router-link to="/admin/news" class="btn btn-secondary">Thoát</router-link>
                        <button type="submit" class="btn btn-primary">
                            {{ isEdit ? "Cập nhật" : "Thêm mới" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const isEdit = ref(false);
const editId = ref(null);

const listNews = ref({
    name: "",
    title: "",
    text: "",
    date: "",
    status: "true", // lưu dưới dạng string "true"/"false" vì radio trả về string
    image: "",
});

// errors per-field
const errors = ref({
    name: "",
    title: "",
    text: "",
    date: "",
    status: "",
    image: "",
});

// clear single error when user types/selects
const clearError = (field) => {
    errors.value[field] = "";
};

// validate trước khi gửi
const validateForm = () => {
    let valid = true;
    errors.value = { name: "", title: "", text: "", date: "", status: "", image: "" };

    if (!listNews.value.name || !listNews.value.name.trim()) {
        errors.value.name = "Vui lòng nhập tên trò chơi!";
        valid = false;
    }
    if (!listNews.value.title || !listNews.value.title.trim()) {
        errors.value.title = "Vui lòng nhập tiêu đề!";
        valid = false;
    }
    if (!listNews.value.text || !listNews.value.text.trim()) {
        errors.value.text = "Vui lòng nhập nội dung!";
        valid = false;
    }
    if (!listNews.value.date) {
        errors.value.date = "Vui lòng chọn ngày đăng!";
        valid = false;
    } else {
        // optional: kiểm tra ngày hợp lệ (không phải tương lai nếu cần)
        const d = new Date(listNews.value.date);
        if (Number.isNaN(d.getTime())) {
            errors.value.date = "Ngày không hợp lệ!";
            valid = false;
        }
    }
    if (listNews.value.status !== "true" && listNews.value.status !== "false") {
        errors.value.status = "Vui lòng chọn trạng thái!";
        valid = false;
    }
    if (!listNews.value.image) {
        errors.value.image = "Vui lòng tải lên ảnh!";
        valid = false;
    }

    return valid;
};

// upload ảnh lên Cloudinary
const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // clear previous error
    errors.value.image = "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ASM2_VUE");

    try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dyb1ybovu/image/upload", formData);
        listNews.value.image = res.data.secure_url;
    } catch (err) {
        console.error(err);
        errors.value.image = "Lỗi upload ảnh!";
    }
};

// load khi edit
onMounted(async () => {
    const id = route.params.id;
    if (id) {
        isEdit.value = true;
        editId.value = id;
        try {
            const res = await axios.get(`http://localhost:3000/News/${id}`);
            // đảm bảo status là string để radio binding đúng
            listNews.value = {
                name: res.data.name ?? "",
                title: res.data.title ?? "",
                text: res.data.text ?? "",
                date: res.data.date ?? "",
                status: String(res.data.status ?? "true"),
                image: res.data.image ?? "",
            };
        } catch (err) {
            console.error(err);
            alert("Không lấy được dữ liệu để sửa!");
        }
    }
});

// save (create hoặc update)
const saveNews = async () => {
    if (!validateForm()) {
        // scroll tới đầu form nếu muốn: window.scrollTo(0,0)
        return;
    }

    // chuyển status về boolean khi lưu vào DB nếu cần
    const payload = {
        name: listNews.value.name.trim(),
        title: listNews.value.title.trim(),
        text: listNews.value.text.trim(),
        date: listNews.value.date,
        status: listNews.value.status === "true",
        image: listNews.value.image,
    };

    try {
        if (isEdit.value) {
            await axios.put(`http://localhost:3000/News/${editId.value}`, payload);
            alert("Cập nhật thành công!");
        } else {
            await axios.post("http://localhost:3000/News", payload);
            alert("Thêm mới thành công!");
        }
        router.push("/admin/news");
    } catch (err) {
        console.error(err);
        alert("Lỗi khi lưu dữ liệu!");
    }
};
</script>

<style scoped>
.form-scroll {
    max-height: 69vh;
    overflow-y: auto;
    padding-right: 8px;
}

.form-scroll::-webkit-scrollbar {
    width: 6px;
}

.form-scroll::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
}

.text-danger {
    font-size: 0.85rem;
}
</style>
