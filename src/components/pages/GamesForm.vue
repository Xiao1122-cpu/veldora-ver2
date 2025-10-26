<template>
    <div class="container">
        <div class="main-content">
            <h4 class="modal-title" id="exampleModalLabel">
                {{ isEdit ? "Cập nhật trò chơi" : "Thêm trò chơi" }}
            </h4>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="router.push('/admin/games')">
                    Thoát
                </button>
                <button type="submit" class="btn btn-primary" @click="saveGame">
                    {{ isEdit ? "Cập nhật" : "Thêm mới" }}
                </button>
            </div>

            <div class="modal-body form-scroll">
                <form @submit.prevent="saveGame">
                    <!-- Tên trò chơi -->
                    <div class="mb-3">
                        <label for="name" class="form-label">Tên Trò Chơi</label>
                        <input type="text" class="form-control" id="name" v-model="listGames.name" />
                        <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                    </div>

                    <!-- Giới thiệu -->
                    <div class="mb-3">
                        <label for="title" class="form-label">Giới Thiệu</label>
                        <input type="text" class="form-control" id="title" v-model="listGames.title" />
                        <small v-if="errors.title" class="text-danger">{{ errors.title }}</small>
                    </div>

                    <!-- Liên kết -->
                    <div class="mb-3">
                        <label for="link" class="form-label">Liên Kết</label>
                        <input type="text" class="form-control" id="link" v-model="listGames.link" />
                        <small v-if="errors.link" class="text-danger">{{ errors.link }}</small>
                    </div>

                    <!-- Trạng thái -->
                    <div class="mb-3">
                        <label class="form-label d-block">Trạng thái</label>
                        <div class="form-check form-check-inline">
                            <input v-model="listGames.status" class="form-check-input" type="radio" name="status"
                                :value="true" />
                            <label class="form-check-label">Hiển Thị</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input v-model="listGames.status" class="form-check-input" type="radio" name="status"
                                :value="false" />
                            <label class="form-check-label">Ẩn</label>
                        </div>
                        <small v-if="errors.status" class="text-danger d-block">{{ errors.status }}</small>
                    </div>

                    <!-- Logo -->
                    <div class="mb-3">
                        <label for="logo" class="form-label">Logo</label>
                        <input type="file" class="form-control" id="logo" @change="(e) => uploadImage(e, 'logo')"
                            accept="image/*" />
                        <small v-if="errors.logo" class="text-danger d-block">{{ errors.logo }}</small>
                    </div>
                    <div v-if="listGames.logo" class="mb-3 text-center">
                        <img :src="listGames.logo" alt="preview" class="img-thumbnail"
                            style="width:150px; height:150px; object-fit:cover;" />
                    </div>

                    <!-- Ảnh -->
                    <div class="mb-3">
                        <label for="image" class="form-label">Ảnh</label>
                        <input type="file" class="form-control" id="image" @change="(e) => uploadImage(e, 'image')"
                            accept="image/*" />
                        <small v-if="errors.image" class="text-danger d-block">{{ errors.image }}</small>
                    </div>
                    <div v-if="listGames.image" class="mb-3 text-center">
                        <img :src="listGames.image" alt="preview" class="img-thumbnail"
                            style="width:150px; height:150px; object-fit:cover;" />
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

const listGames = ref({
    name: "",
    title: "",
    link: "",
    status: true, // ✅ mặc định hiển thị
    logo: "",
    image: "",
});

const errors = ref({
    name: "",
    title: "",
    link: "",
    status: "",
    logo: "",
    image: "",
});

const validateForm = () => {
    let isValid = true;
    errors.value = { name: "", title: "", link: "", status: "", logo: "", image: "" };

    if (!listGames.value.name.trim()) {
        errors.value.name = "Vui lòng nhập tên trò chơi!";
        isValid = false;
    }
    if (!listGames.value.title.trim()) {
        errors.value.title = "Vui lòng nhập phần giới thiệu!";
        isValid = false;
    }
    if (!listGames.value.link.trim()) {
        errors.value.link = "Vui lòng nhập liên kết!";
        isValid = false;
    }
    if (listGames.value.status === "" || listGames.value.status === null) {
        errors.value.status = "Vui lòng chọn trạng thái!";
        isValid = false;
    }
    if (!listGames.value.logo) {
        errors.value.logo = "Vui lòng tải lên logo!";
        isValid = false;
    }
    if (!listGames.value.image) {
        errors.value.image = "Vui lòng tải lên ảnh!";
        isValid = false;
    }

    return isValid;
};

const uploadImage = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ASM2_VUE");

    try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dyb1ybovu/image/upload", formData);
        const url = res.data.secure_url;
        if (type === "logo") listGames.value.logo = url;
        if (type === "image") listGames.value.image = url;
    } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Lỗi upload ảnh!");
    }
};

const saveGame = async () => {
    if (!validateForm()) return;

    try {
        if (isEdit.value) {
            await axios.put(`http://localhost:3000/listGames/${editId.value}`, listGames.value);
            alert("Cập nhật thành công!");
        } else {
            await axios.post("http://localhost:3000/listGames", listGames.value);
            alert("Thêm mới thành công!");
        }
        router.push("/admin/games");
    } catch (err) {
        console.error(err);
        alert("Lỗi khi lưu dữ liệu!");
    }
};

onMounted(async () => {
    const id = route.params.id;
    if (id) {
        isEdit.value = true;
        editId.value = id;
        try {
            const res = await axios.get(`http://localhost:3000/listGames/${id}`);
            listGames.value = res.data;
        } catch (err) {
            console.error(err);
            alert("Không thể tải dữ liệu trò chơi!");
        }
    }
});
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
</style>
