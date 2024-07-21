<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

const parallax = (): void => {
    const parallaxElement = document.getElementById("parallax");
    if (parallaxElement) {
        parallaxElement.style.top = `-${window.pageYOffset / 4}px`;
    }
};

onMounted((): void => {
    window.addEventListener('scroll', parallax);
});

onBeforeUnmount((): void => {
    window.removeEventListener('scroll', parallax);
});
</script>

<template>
    <div id="parallax" class="main-bg">
        <h2></h2>
    </div>
</template>

<style lang="scss">
.main-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 20rem;
    padding: 0 4rem;
    overflow: hidden;
    // animation-name: BgMove1;
    animation-duration: .4s;
    animation-delay: .4s;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        display: block;
        width: 100%;
        height: 100%;
    }
    &::before {
        left: -1rem;
        width: calc(100% + 2rem);
        // background-size: cover;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        animation-name: BgMove2;
        animation-duration: 40s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-fill-mode: both;
        animation-timing-function: linear;
    }
    &::after {
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
    }
    h2 {
        flex: 1 1 100%;
        position: relative;
        z-index: 5;
        display: block;
        max-width: 60rem;
        line-height: 2;
        font-size: 3rem;
        color: #FFF;
        margin: 0 auto;
        padding-left: 16rem;
        animation-name: fadeIn;
        animation-duration: .4s;
        animation-delay: .6s;
        animation-fill-mode: both;
    }
    @media only screen and (min-width: 1921px) {
        &::before {
            background-size: cover;
        }
    } 
    @media only screen and (max-width: 960px) {
        top: 0 !important;
        height: 20rem;
        animation-name: none;
        &::before {
            animation-name: BgMove2_t;
        }
        h2 {
            animation-name: none;
        }
    }
    @media only screen and (max-width: 768px) {
        height: 15rem;
        h2 {
            font-size: 2rem;
            padding-left: 10rem;
        }
    }
    @media only screen and (max-width: 480px) {
        align-items: flex-start;
        height: 12rem;
        padding-top: 4rem;
        h2 {
            font-size: 1.5rem;
            text-align: center;
            padding-left: 0;
        }
    }
}

.main-bg {
    .is-about & {
        &::before {
            background-image: url("/images/bg_about.jpg");
        }
        h2 {
            &::before {
                content: 'About me';
            }
        }
    }
    .is-learn & {
        &::before {
            background-image: url("/images/bg_learn.jpg");
        }
    }
    .is-workshop & {
        &::before {
            background-image: url("/images/bg_workshop.jpg");
        }
    }
    .is-hikingbook & {
        &::before {
            background-image: url("/images/bg_hikingbook.jpg");
        }
    }
    .is-resources & {
        &::before {
            background-image: url("/images/bg_resources.jpg");
        }
    }
}
</style>