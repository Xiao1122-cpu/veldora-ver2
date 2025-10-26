<template>
    <div class="container-fluid">
        <div class="row">
            <Sidebar></Sidebar>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Header></Header>
                <router-view style="max-height: 100px;" />
            </main>
        </div>  
    </div>
</template>

<script setup>
import Header from '@/components/admin/Header.vue';
import Sidebar from '@/components/admin/Sidebar.vue';
// const filterUsers = (kw) => {
//     keyword.value = kw.toLowerCase();
// };

// const filteredUsers = computed(() =>
//     users.value.filter(
//         (u) =>
//             u.username.toLowerCase().includes(keyword.value) ||
//             u.email.toLowerCase().includes(keyword.value)
//     )
// );
</script>

<style lang="scss" scoped>

</style>