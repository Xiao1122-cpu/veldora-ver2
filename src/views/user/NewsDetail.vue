<template>
  <div>
    <div class="backgound-dark"></div>
    <div class="container" style="margin-top: 50px;">
      <div class="row">
       
        <div class="col-lg-8">
          <router-link to="/news" class="text-deco">
            <i class="bi bi-arrow-left-circle fs-1"></i> Quay Lại
          </router-link>

          <div class="main-container mx-auto border p-3 rounded" v-if="newsDetail">
            <h1 class="text-center">{{ newsDetail.title }}</h1>
            <p id="date" class="text-center text-secondary">{{ newsDetail.date }}</p>
            <div class="hr-color"></div>
            <img :src="newsDetail.image" alt="" class="w-100 mt-4" style="height: 400px; object-fit: cover;">
            <div class="text mt-5 fs-5 mb-5" style="white-space: pre-line;">
              {{ newsDetail.text }}
            </div>
          </div>
        </div>

      
        <div class="col-lg-4">
          <div class="card shadow-sm p-3 mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Lượt thích</h5>
              <button class="btn btn-outline-danger" @click="toggleLike">
                <i :class="['bi', isLiked ? 'bi-heart-fill text-danger' : 'bi-heart']"></i>
                <span class="ms-1">{{ likeCount }}</span>
              </button>
            </div>
          </div>

          <div class="card shadow-sm p-3">
            <h5 class="mb-3">Bình luận</h5>

            <div v-if="comments.length === 0" class="text-muted text-center mb-3">
              Chưa có bình luận nào
            </div>

           
            <div v-for="comment in comments" :key="comment.id" class="mb-3 border-bottom pb-2">
              <strong>{{ comment.username }}</strong>
              <p class="mb-1">{{ comment.text }}</p>
              <small class="text-secondary">{{ formatDate(comment.date) }}</small>
            </div>

           
            <div v-if="currentUser" class="mt-3">
              <textarea v-model="newComment" class="form-control mb-2" placeholder="Nhập bình luận..." rows="3"></textarea>
              <button class="btn btn-primary w-100" @click="addComment" :disabled="!newComment.trim()">Gửi bình luận</button>
            </div>

            <div v-else class="alert alert-warning mt-3">
              <i class="bi bi-info-circle"></i> Vui lòng đăng nhập để bình luận.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const newsDetail = ref(null);
const comments = ref([]);
const likeCount = ref(0);
const isLiked = ref(false);
const newComment = ref("");
const route = useRoute();

const currentUser = JSON.parse(localStorage.getItem("user") || "null");

onMounted(async () => {
  const id = route.params.id;
  await getNewsDetail(id);
  await getComments(id);
  await getLikes(id);
});

const getNewsDetail = async (id) => {
  const res = await axios.get(`http://localhost:3000/News/${id}`);
  newsDetail.value = res.data;
};

const getComments = async (id) => {
  const res = await axios.get(`http://localhost:3000/comments?newsId=${id}`);
  comments.value = res.data.reverse(); 
};

const getLikes = async (id) => {
  const res = await axios.get(`http://localhost:3000/likes?newsId=${id}`);
  likeCount.value = res.data.length;
  if (currentUser) {
    isLiked.value = res.data.some((l) => l.userId == currentUser.id);
  }
};

// Gửi bình luận
const addComment = async () => {
  if (!newComment.value.trim()) return;

  const comment = {
    newsId: newsDetail.value.id,
    userId: currentUser.id,
    username: currentUser.username,
    text: newComment.value,
    date: new Date().toISOString(),
  };

  await axios.post("http://localhost:3000/comments", comment);
  newComment.value = "";
  await getComments(newsDetail.value.id);
};

// Thích / bỏ thích
const toggleLike = async () => {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để thích bài viết.");
    return;
  }

  const res = await axios.get(
    `http://localhost:3000/likes?newsId=${newsDetail.value.id}&userId=${currentUser.id}`
  );

  if (res.data.length === 0) {
    // thêm like mới
    await axios.post("http://localhost:3000/likes", {
      newsId: newsDetail.value.id,
      userId: currentUser.id,
    });
    isLiked.value = true;
    likeCount.value++;
  } else {
    // xóa like
    const likeId = res.data[0].id;
    await axios.delete(`http://localhost:3000/likes/${likeId}`);
    isLiked.value = false;
    likeCount.value--;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  });
};
</script>

<style>
.backgound-dark {
  background-image: url(@/assets/image/star.jpg);
  width: auto;
  height: 75px;
}

.hr-color {
  background-image: url(@/assets/image/star.jpg);
  width: auto;
  height: 5px;
  border-radius: 10px;
}

.text-deco {
  text-decoration: none;
}
</style>
