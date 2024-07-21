<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue';
import Prism from 'prismjs';

const highlightedContent = ref(null);

const highlight = () => {
    if (highlightedContent.value) {
        Prism.highlightAllUnder(highlightedContent.value);
    }
};

onMounted(() => {
    highlight();
});

onUpdated(() => {
    highlight();
});
</script>

<template>
    <div ref="highlightedContent">
        <slot></slot>
    </div>
</template>

<style lang="scss">
</style>