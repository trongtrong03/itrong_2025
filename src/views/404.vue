<script setup lang="ts">
    import { useRouter, RouterLink } from "vue-router";

    const router = useRouter();

    // 返回上一個路由
    const goBack = () => {
        router.back();
    };
</script>

<template>
    <div class="error-wrap">
        <div class="error-bg"></div>
        <h1>Ooops!</h1>
        <h2>很抱歉！此網頁不存在。</h2>
        <div class="error-btn">
            <RouterLink to="/">首頁</RouterLink>
            <button @click="goBack">上一頁</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// error
.error-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    background-color: #fff;
    align-items: center;
    align-content: center;
    justify-content: center;
    text-align: center;
    h1 {
        flex: 1 1 100%;
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    h2 {
        flex: 1 1 100%;
        margin-bottom: 4rem;
    }
}

.error-bg {
    width: 300px;
    height: 300px;
    background-image: url("/images/error01.jpg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    border-radius: 100%;
    margin: 0 auto 3rem;
    animation-name: error;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.error-btn {
    flex: 1 1 100%;
    display: flex;
    justify-content: center;
    button,
    a {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        min-width: 10rem;
        height: 3rem;
        text-align: center;
        color: #FFF;
        background-color: var(--black);
        border-radius: 1.5rem;
        margin: 0 1rem;
        padding: 0 1rem;
        transition: color .3s, background .3s;
        &:first-child {
            color: #FFF;
            background-color: var(--c1);
        }
    }
}
</style>