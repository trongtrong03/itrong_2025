<script setup lang="ts">
    import { inject } from 'vue';
    import type { CatalogItem } from '@/stores/catalog';

    defineProps<{
        isActive: number,
        catalog: CatalogItem[],
    }>();

    const emit = defineEmits(['update:isActive']);

    // 點擊時更新 active
    const toggle = (val: number) => {
        emit('update:isActive', val)
    }
</script>

<template>
    <div class="text-group">
        <h2 v-text="catalog[0].title"></h2>
        <div class="text-accordin is-error">
        </div>
    </div>
    <div class="text-group">
        <h2 v-text="catalog[1].title"></h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-group">
        <h2 v-text="catalog[2].title"></h2>
        <div class="text-accordin is-others">
        </div>
    </div>
</template>