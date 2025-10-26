<template>
    <div class="container py-3">
        <h5 class="fw-bold">{{ isEdit ? "Cập nhật Slider" : "Thêm Slider Mới" }}</h5>

        <div class="d-flex justify-content-end me-5">
            <router-link to="/admin/carousel" class="btn btn-secondary me-2">Thoát</router-link>
            <button type="button" class="btn btn-primary" @click="saveCarousel">
                {{ isEdit ? "Cập nhật" : "Thêm mới" }}
            </button>
        </div>

        <form class="form-scroll mt-3" @submit.prevent="saveCarousel">
            <div class="mb-3">
                <label class="form-label">Tiêu đề</label>
                <input type="text" class="form-control" v-model="carousel.title" />
                <small v-if="errors.title" class="text-danger">{{ errors.title }}</small>
            </div>

            <div class="mb-3">
                <label class="form-label">Nội dung</label>
                <textarea class="form-control" rows="3" v-model="carousel.text"></textarea>
                <small v-if="errors.text" class="text-danger">{{ errors.text }}</small>
            </div>

            <div class="mb-3">
                <label class="form-label">Đường dẫn</label>
                <input type="text" class="form-control" v-model="carousel.link" />
                <small v-if="errors.link" class="text-danger">{{ errors.link }}</small>
            </div>

            <div class="mb-3">
                <label class="form-label d-block">Trạng thái</label>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        :value="true"
                        v-model="carousel.status"
                    />
                    <label class="form-check-label">Hiển thị</label>
                </div>
                <div class="form-check form-check-inline">
                    <input
                        class="form-check-input"
                        type="radio"
                        :value="false"
                        v-model="carousel.status"
                    />
                    <label class="form-check-label">Ẩn</label>
                </div>
                <small v-if="errors.status" class="text-danger d-block">{{ errors.status }}</small>
            </div>

            <div class="mb-3">
                <label class="form-label">Logo</label>
                <input type="file" class="form-control" accept="image/*" @change="e => uploadImage(e, 'logo')" />
                <div v-if="carousel.logo" class="text-center mt-2">
                    <img :src="carousel.logo" alt="logo preview" class="img-thumbnail" width="150" height="150" />
                </div>
                <small v-if="errors.logo" class="text-danger d-block">{{ errors.logo }}</small>
            </div>

            <div class="mb-3">
                <label class="form-label">Ảnh nền</label>
                <input type="file" class="form-control" accept="image/*" @change="e => uploadImage(e, 'image')" />
                <div v-if="carousel.image" class="text-center mt-2">
                    <img :src="carousel.image" alt="preview" class="img-thumbnail" width="150" height="150" />
                </div>
                <small v-if="errors.image" class="text-danger d-block">{{ errors.image }}</small>
            </div>
        </form>
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

const carousel = ref({
    title: "",
    text: "",
    link: "",
    status: true,
    logo: "",
    image: "",
});

const errors = ref({
    title: "",
    text: "",
    link: "",
    status: "",
    logo: "",
    image: "",
});

const validateForm = () => {
    let isValid = true;
    errors.value = {
        title: "",
        text: "",
        link: "",
        status: "",
        logo: "",
        image: "",
    };

    if (!carousel.value.title.trim()) {
        errors.value.title = "Vui lòng nhập tiêu đề!";
        isValid = false;
    }
    if (!carousel.value.text.trim()) {
        errors.value.text = "Vui lòng nhập nội dung!";
        isValid = false;
    }
    if (!carousel.value.link.trim()) {
        errors.value.link = "Vui lòng nhập đường dẫn!";
        isValid = false;
    }
    if (carousel.value.status === "" || carousel.value.status === null) {
        errors.value.status = "Vui lòng chọn trạng thái!";
        isValid = false;
    }
    if (!carousel.value.logo) {
        errors.value.logo = "Vui lòng tải lên logo!";
        isValid = false;
    }
    if (!carousel.value.image) {
        errors.value.image = "Vui lòng tải lên ảnh nền!";
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
        if (type === "logo") carousel.value.logo = url;
        if (type === "image") carousel.value.image = url;
    } catch (err) {
        console.error(err);
        alert("Lỗi upload ảnh!");
    }
};

onMounted(async () => {
    const id = route.params.id;
    if (id) {
        isEdit.value = true;
        editId.value = id;
        try {
            const res = await axios.get(`https://veldora-ver2.onrender.com/carousel/${id}`);
            carousel.value = res.data;
        } catch (err) {
            console.error(err);
            alert("Không thể tải dữ liệu slider!");
        }
    }
});

const saveCarousel = async () => {
    if (!validateForm()) return;

    try {
        if (isEdit.value) {
            await axios.put(`https://veldora-ver2.onrender.com/carousel/${editId.value}`, carousel.value);
            alert("Cập nhật thành công!");
        } else {
            await axios.post("https://veldora-ver2.onrender.com/carousel", carousel.value);
            alert("Thêm mới thành công!");
        }
        router.push("/admin/carousel");
    } catch (err) {
        console.error(err);
        alert("Lỗi khi lưu dữ liệu!");
    }
};
</script>

<style scoped>
img {
    object-fit: cover;
}
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
