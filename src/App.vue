<script setup lang="ts">
    import Header from "./components/Header.vue";
    import Footer from "./components/Footer.vue";
    import Float from "./components/Btn/Float.vue";
    import { RouterView, useRoute } from "vue-router";

    const route = useRoute();
</script>

<template>
    <Header />
    <transition name="fade" mode="out-in">
        <main class="main-wrap">
            <div class="main-inside">
                <RouterView />
            </div>
            <Float />
        </main>
    </transition>
    <Footer />
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s ease, transform .75s ease;
}

.fade-enter-from,
.fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
