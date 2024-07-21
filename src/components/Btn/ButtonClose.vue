<script setup>
    // 載入 pinia stores navToggle.ts
    import { useNavToggle } from "@/stores/navToggle";
    const navToggle = useNavToggle();

    // close nav active
    const navToggleActiveRemove = () => {
        navToggle.navActive = false;
        document.body.classList.remove('no-scroll');
    };
</script>

<template>
    <button @click="navToggleActiveRemove" class="btn-close">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.625 6.625L15.375 15.375M6.625 15.375L15.375 6.625" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</template>

<style lang="scss" scoped>
    .btn-close {
        display: none;
        @media only screen and (max-width: 768px) {
            position: absolute;
            top: 30px;
            right: 50px;
            z-index: 10;
            display: block;
            width: 48px;
            height: 48px;
            background-color: var(--c1);
            border-radius: 100%;
            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                width: 22px;
                stroke: #FFF;
                stroke-width: 2.5px;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>