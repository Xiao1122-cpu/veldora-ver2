<template>
    <form class="d-flex mb-3" @submit.prevent>
        <input
            v-model="searchQuery"
            type="text"
            class="form-control me-2"
            placeholder="Tìm kiếm nội dung..."
        />
        <button class="btn btn-outline-primary" type="button">
            Tìm
        </button>
    </form>
</template>

<script setup>
const props = defineProps({
    modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const searchQuery = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});
</script>
