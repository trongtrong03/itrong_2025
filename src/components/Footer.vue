<script setup lang="ts">
    // 載入 pinia stores
    import { useBaseInfo } from "@/stores/baseInfo";
    const baseInfo = useBaseInfo();
</script>

<template>
    <footer class="footer-wrap">
        <section class="footer-center">
            <div class="footer-copyright">
                <p>Copyright © 2014-2024 {{ baseInfo.SHORTNAME }} All Rights Reserved.</p>
            </div>
        </section>
    </footer>
</template>

<style lang="scss" scoped>
.footer-wrap {
    position: relative;
    z-index: 10;
    background-color: var(--black);
}

.footer-center {
    position: relative;
    max-width: var(--dw);
    margin: 0 auto;
}

.footer-copyright {
    position: relative;
    padding: 1.5rem 0;
    p {
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.75rem;
        color: #878787;
    }
}
</style>