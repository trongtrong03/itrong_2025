<script setup lang="ts">
    import { defineProps } from 'vue';

    const props = defineProps<{
        to: string;
    }>();
</script>

<template>
    <RouterLink :to="to" class="more-button">
        <slot />
    </RouterLink>
</template>

<style lang="scss" scoped>
.more-button {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    z-index: 10;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    text-align: center;
    font-size: 0.875em;
    color: var(--black);
    transform: translateX(-50%);
    transition: all .3s;
    &::before {
        content: '...';
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        text-align: center;
        border: 1px solid var(--black);
        border-radius: 100%;
        transition: all .3s;
    }
    &::after {
        content: 'MORE';
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: all .3s;
    }
    &:hover {
        &::before {
            opacity: 0;
            transform: scale(0);
        }
        &::after {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
}
</style>