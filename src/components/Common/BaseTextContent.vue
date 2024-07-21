<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from 'vue-router';
const route = useRoute();

// 動態加載腳本
const loadScripts = () => {
    return new Promise((resolve, reject) => {
        const parallaxJS = document.createElement('script');
        parallaxJS.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
        parallaxJS.onload = () => {
            // console.log("parallax.min.js loaded");
            resolve(true);
        };
        parallaxJS.onerror = () => {
            reject(new Error("Failed to load codepen.js"));
        };
        document.head.appendChild(parallaxJS);
    });
};

onMounted(async () => {
    if (route.path.includes('learn')) {
        try {
            await loadScripts();
        } catch (error) {
            console.error(error);
        }
    }
});
</script>

<template>
    <section class="article-wrap fade-up">
        <div class="article-container">
            <div class="article-content">
                <slot />
            </div>
        </div>
    </section>
</template>

<style lang="scss">
</style>