<script setup lang="ts">
import { defineProps, defineAsyncComponent } from 'vue';

const props = defineProps({
    id: String
});

// 使用 defineAsyncComponent 异步加载组件
const loadComponent = defineAsyncComponent(async () => {
    try {
        const module = await import(`./articles/${props.id}.vue`);
        return module.default;
    } catch (error) {
        console.error('Error loading component:', error);
    }
});
</script>

<template>
    <component :is="loadComponent" />
</template>
