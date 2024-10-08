<script setup lang="ts">
// 引用組件
import useBodyClass from "@/hooks/useBodyClass";
import SvgIcons from "@/components/SvgIcons.vue";
import MoreLink from "@/components/Btn/MoreLink.vue";

// 引用功能
import axios from 'axios';
import { RouterLink, useRoute, useRouter } from "vue-router";
import { onMounted, onUpdated } from "vue";

// 載入 pinia stores
import { useInfoStore } from '@/stores/datalist';

// 傳 class name 給 body
useBodyClass("is-index");

/* index */
// 從 store 取得 data
const infoStore = useInfoStore();

onMounted(() => {
    infoStore.loadJobs();
    infoStore.loadSkills();
});

// 動態加載腳本
const loadScripts = () => {
    return new Promise((resolve, reject) => {
        const parallaxJS = document.createElement('script');
        parallaxJS.src = "/js/parallax.min.js";
        parallaxJS.onload = () => {
            // console.log("parallax.min.js loaded");
            resolve(true);
        };
        parallaxJS.onerror = () => {
            reject(new Error("Failed to load parallax.min.js"));
        };
        document.head.appendChild(parallaxJS);
    });
};

onMounted(async () => {
    try {
        await loadScripts();
        parallax();
    } catch (error) {
        console.error(error);
    }
});

/* scroll down button */
const scrollDown = () => {
    const scrollDownButton = document.getElementById("scrollDown");
    const scrollDownArea = document.getElementById("scrollArea");

    scrollDownButton.addEventListener("click", function() {
        scrollDownArea.scrollIntoView({ behavior: 'smooth' });
    });
};

onMounted(() => {
    scrollDown();
});

/* 視差滾動 */
const parallax = () => {
    if (typeof Parallax !== 'undefined') {
        var bg = document.getElementById("parallaxStage");
        var parallax_sk = new Parallax(bg, {
            // limitY: 0,
        });
    }
};

onMounted(() => {
    parallax();
});

onUpdated(() => {
    parallax();
});

/* 圖片跑馬燈 */
const marquee = () => {
    const marqueeImages = document.querySelectorAll(".index-hiker-photo");

    marqueeImages.forEach((marqueeImage) => {
        marqueeImage.animate(
            {
                translate: [0, "calc(-1500% - 15rem)"]
            },
            {
                duration: 50000,
                iterations: Infinity
            }
        );
    });
}

onMounted(() => {
    marquee();
});
</script>

<template>
    <!-- cover -->
    <section class="index-cover-wrap">
        <figure class="index-cover-bg">
            <div></div>
        </figure>
        <hgroup class="index-cover-text">
            <h1>ITRONG</h1>
            <h2>WORK STUDIO</h2>
        </hgroup>
        <button id="scrollDown" class="scroll-down">
            <span>SCROLL DOWN</span>
            <b></b>
        </button>
    </section>
    <!-- about -->
    <section id="scrollArea" class="index-about-wrap">
        <div class="index-about-ceter" data-aos="custom">
            <div class="index-about-title">
                <h2>I am...</h2>
            </div>
            <div class="index-about-article">
                <div class="index-about-photo">
                    <figure>
                        <i></i>
                        <span id="parallaxStage">
                            <b data-depth="0.5"></b>
                        </span>
                    </figure>
                </div>
                <div class="index-about-text">
                    <hgroup>
                        <h2>Trong.Chen</h2>
                        <ul>
                            <li>Born in 1989</li>
                            <li>現居台中</li>
                            <li>國立彰化師範大學資管系 畢業</li>
                        </ul>
                        <ul>
                            <li v-for="item in infoStore.JOB_LIST" :key="item.id">
                                <time>{{ item.start }} ~ {{ item.end }}</time>
                                <p>
                                    <span v-text="item.name"></span>
                                    <span v-text="item.title"></span>
                                </p>
                            </li>
                        </ul>
                    </hgroup>
                </div>
            </div>
            <MoreLink to="/about" />
            <div class="index-about-bg">
                <ul>
                    <li><b></b><b></b><b></b><b></b><b></b><b></b></li>
                    <li><b></b><b></b><b></b><b></b><b></b><b></b></li>
                    <li><b></b><b></b><b></b><b></b><b></b><b></b></li>
                </ul>
            </div>
        </div>
    </section>
    <!-- job -->
    <section class="index-job-wrap">
        <div class="index-job-ceter" data-aos="custom">
            <div class="index-job-title">
                <h2>My job is...</h2>
            </div>
            <div class="index-job-name">
                <h2>Web front-end engineer</h2>
            </div>
            <div class="index-job-text">
                <template v-for="item in infoStore.SKILL_LIST" :key="item.id">
                    <hgroup>
                        <h3>{{ item.title }}</h3>
                        <ul>
                            <li v-for="skill in item.skills" :key="skill">{{ skill }}</li>
                        </ul>
                    </hgroup>
                </template>
            </div>
            <MoreLink to="/learn" />
        </div>
    </section>
    <!-- hiker -->
    <section class="index-hiker-wrap">
        <div class="index-hiker-ceter" data-aos="custom">
            <div class="index-hiker-title">
                <h2>I am also...</h2>
            </div>
            <div class="index-hiker-name">
                <h2>Adventurer</h2>
            </div>
            <div class="index-hiker-marquee">
                <div class="index-hiker-photo" v-for="index in 30" :key="index"></div>
            </div>
            <MoreLink to="/hikingbook" />
        </div>
    </section>
</template>

<style lang="scss" scoped>
// cover
.index-cover-wrap {
    position: relative;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    @media only screen and (max-width: 960px) {
        height: calc(100dvh - 4rem);
    }
    @media only screen and (max-width: 480px) {
        height: calc(100dvh - 3rem);
    }
}

.index-cover-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    display: block;
    width: 100%;
    height: 100%;
    > div {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        animation-name: indexCoverAni01;
        animation-duration: 20s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: linear;
        &::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-image: url("/images/index/cover.jpg");
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: cover;
        }
    }
}

.index-cover-text {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(#FFF, 1);
    padding-bottom: 5vh;
    mix-blend-mode: screen;
    h1,
    h2 {
        font-family: "Konkhmer Sleokchher", system-ui;
        font-weight: bold;
        font-style: normal;
        animation-name: indexCoverAni02;
        animation-duration: .5s;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out;
    }
    h1 {
        position: relative !important;
        flex: 1 1 100%;
        font-size: 15vw;
        animation-delay: .25s;
    }
    h2 {
        position: relative !important;
        flex: 1 1 100%;
        font-size: 6vw;
        animation-delay: .5s;
    }
    @media only screen and (max-width: 960px) {
        padding-bottom: 0;
    }
    @media only screen and (max-width: 480px) {
        h1 {
            font-size: 18vw;
        }
        h2 {
            font-size: 7.5vw;
        }
    }
}

.scroll-down {
    position: absolute;
    left: 50%;
    bottom: 2rem;
    z-index: 10;
    display: block;
    font-size: 0.875rem;
    transform: translateX(-50%);
    animation-name: fadeIn;
    animation-duration: .5s;
    animation-delay: 1s;
    animation-fill-mode: both;
    span {
        display: block;
        background: -webkit-linear-gradient(left, #81D8D0, #333 25%, #81D8D0 50%, #333 75%, #81D8D0);
        color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        transition: all .3s ease;
        animation-name: textMaskedAnimation;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    b {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: all .3s;
        &::before,
        &::after {
            content: '';
            position: absolute;
            left: calc(50% - 0.5rem);
            z-index: 2;
            width: 1rem;
            height: 1rem;
            background-color: transparent;
            border-style: solid;
            border-color: var(--black);
            opacity: 0;
            transform: translateY(0%) rotate(45deg);
            animation-name: scrolldown;
            animation-duration: 1.2s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
        }
        &::before {
            bottom: 0;
            border-width: 0 2px 2px 0;
            animation-delay: .15s;
        }
        &::after {
            bottom: 8px;
            border-width: 0 2px 2px 0;
        }
    }
    &:hover {
        span {
            transform: translateY(-2rem);
        }
        b {
            opacity: 1;
        }
    }
}

// about
.index-about-wrap {
    position: relative;
    background-color: var(--c1);
    // background-color: #e0dbd8;
    overflow: hidden;
}

.index-about-ceter {
    position: relative;
    width: calc(100% - 4rem);
    max-width: 90rem;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0 auto;
    padding-bottom: 8rem;
    .more-button {
        opacity: 0;
        animation-duration: .5s;
        animation-delay: 1.4s;
        animation-fill-mode: both;
        &:hover {
            &::before {
                border-color: #FFF;
            }
        }
    }
    &.aos-animate {
        .more-button {
            animation-name: fadeIn;
        }
    }
    @media only screen and (max-width: 768px) {
        width: calc(100% - 2rem);
        min-height: 0;
    }
    @media only screen and (max-width: 480px) {
        width: 100%;
        padding-bottom: 6rem;
    }
}

.index-about-bg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 20rem;
    background-color: var(--c2);
    border-radius: 0 0 5rem 5rem;
    opacity: 0;
    transform: translateY(-100%);
    overflow: hidden;
    animation-duration: .5s;
    animation-fill-mode: both;
    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
    }
    &::before {
        background-image: url("/images/bg_about.jpg");
        background-position: 50% 25%;
        animation-duration: .5s;
        animation-delay: .3s;
        animation-fill-mode: both;
    }
    &::after {
        background-color: rgba(#333, .5);
    }
    ul {
        position: absolute;
        top: 1rem;
        right: 3rem;
        z-index: 2;
        display: block;
    }
    li {
        display: block;
        height: 4px;
        margin-bottom: 8px;
        b {
            display: inline-block;
            vertical-align: middle;
            width: 4px;
            height: 4px;
            background-color: rgba(#fff, .7);
            border-radius: 100%;
            margin-right: 12px;
        }
    }
    .aos-animate & {
        animation-name: indexAboutBG;
        &::before {
            animation-name: fadeIn;
        }
    }
    @media only screen and (max-width: 960px) {
        height: 16rem;
        border-radius: 0 0 4rem 4rem;
    }
    @media only screen and (max-width: 768px) {
        height: 12rem;
        border-radius: 0 0 2.5rem 2.5rem;
        ul {
            right: 1rem;
        }
    }
    @media only screen and (max-width: 480px) {
        height: 11rem;
        border-radius: 0 0 0 0;
        ul {
            display: none;
        }
    }
}

.index-about-title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: block;
    width: 100%;
    height: 100%;
    h2 {
        position: absolute;
        top: calc(50% - 6rem);
        left: 0%;
        display: block;
        width: 100%;
        text-align: center;
        line-height: 1;
        font-size: 12rem;
        font-weight: bold;
        color: #FFF;
        opacity: 0.7;
        animation-duration: .5s;
        animation-delay: .25s;
        animation-fill-mode: both;
    }
    .aos-animate & {
        h2 {
            animation-name: indexTitleAni;
        }
    }
    @media only screen and (max-width: 1280px) {
        h2 {
            font-size: 10rem;
        }
    }
    @media only screen and (max-width: 960px) {
        h2 {
            font-size: 16vw;
        }
        .aos-animate & {
            h2 {
                animation-name: indexTitleAni_t;
            }
        }
    }
    @media only screen and (max-width: 480px) {
        h2 {
            top: 4rem;
            font-size: 2rem;
        }
        .aos-animate & {
            h2 {
                animation-name: none;
            }
        }
    }
}

.index-about-article {
    position: relative;
    z-index: 5;
    height: 100%;
    min-height: 800px;
    padding-top: 16rem;
    @media only screen and (max-width: 960px) {
        min-height: 600px;
        padding-top: 12rem;
    }
    @media only screen and (max-width: 768px) {
        height: auto;
        min-height: 0;
        padding-top: 8rem;
    }
    @media only screen and (max-width: 480px) {
        padding-top: 7rem;
    }
}

.index-about-photo {
    position: absolute;
    display: block;
    z-index: 6;
    width: 12rem;
    height: 12rem;
    opacity: 0;
    animation-duration: .7s;
    animation-delay: .4s;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    figure {
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        i {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            transform: rotate(-45deg);
            animation-duration: .3s;
            animation-delay: .9s;
            animation-fill-mode: both;
            &::before,
            &::after {
                content: '';
                position: absolute;
                display: block;
                background-color: #333;
            }
            &::before {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
            &::after {
                bottom: 0;
                left: 0;
                width: 50%;
                height: 50%;
            }
        }
        span {
            position: relative;
            z-index: 5;
            flex: 0 0 80%;
            height: 80%;
            border-radius: 100%;
            overflow: hidden;
            b {
                position: absolute !important;
                top: -10% !important;
                left: -10% !important;
                display: block;
                width: 120%;
                height: 120%;
                background-image: url("/images/photo.jpg");
                background-size: cover;
                border-radius: 100%;
            }
        }
    }
    .aos-animate & {
        animation-name: indexAboutAni;
        figure {
            i {
                animation-name: indexAboutImg;
            }
        }
    }
    @media only screen and (max-width: 960px) {
        top: 10rem;
        left: 4rem;
        width: 10rem;
        height: 10rem;
        animation-duration: .4s;
        .aos-animate & {
            animation-name: indexAboutAni_t;
        }
    }
    @media only screen and (max-width: 768px) {
        top: 6rem;
        left: 2rem;
    }
    @media only screen and (max-width: 480px) {
        position: relative;
        top: 0;
        left: 0;
        width: 7.5rem;
        height: 7.5rem;
        margin: 0 auto 2rem;
        figure {
            span {
                flex: 0 0 100%;
                height: 100%;
            }
        }
        .aos-animate & {
            figure {
                i {
                    animation-name: none;
                    &::before,
                    &::after {
                        display: none;
                    }
                }
            }
        }
    }
}

.index-about-text {
    padding-left: 22rem;
    opacity: 0;
    transform: translateY(20%);
    animation-duration: .4s;
    animation-delay: 1.2s;
    animation-fill-mode: both;
    h2 {
        font-size: 2rem;
        color: #FFF;
    }
    ul {
        margin-top: 3rem;
        margin-left: 1rem;
    }
    li {
        font-size: 1rem;
        color: var(--c2);
        padding: 0.5rem 0;
        time {
            display: inline-block;
            font-size: 0.875em;
            margin-bottom: 0.5rem;
        }
        span {
            &::after {
                content: '|';
                margin: 0 0.5rem;
            }
            &:last-child {
                &::after {
                    display: none;
                }
            }
        }
    }
    .aos-animate & {
        animation-name: indexAboutTextAni;
    }
    @media only screen and (max-width: 960px) {
        padding-left: 16rem;
        .aos-animate & {
            animation-name: indexAboutTextAni_t;
        }
    }
    @media only screen and (max-width: 768px) {
        padding-left: 14rem;
    }
    @media only screen and (max-width: 480px) {
        width: calc(100% - 4rem);
        margin: 0 auto;
        padding-left: 0;
        h2 {
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--black);
        }
        ul {
            text-align: center;
            margin-top: 2rem;
            margin-left: 0;
        }
        li {
            list-style-type: none;
        }
    }
}

// job
.index-job-wrap {
    position: relative;
    background-color: #333;
}

.index-job-ceter {
    position: relative;
    width: calc(100% - 8rem);
    max-width: 90rem;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0 auto;
    padding-bottom: 8rem;
    .more-button {
        color: #FFF;
        border-color: #FFF;
        opacity: 0;
        animation-duration: .5s;
        animation-delay: 1.4s;
        animation-fill-mode: both;
        &::before {
            border-color: #FFF;
        }
    }
    &.aos-animate {
        .more-button {
            animation-name: fadeIn;
        }
    }
    @media only screen and (max-width: 768px) {
        width: calc(100% - 4rem);
        min-height: 0;
    }
    @media only screen and (max-width: 480px) {
        width: calc(100% - 2rem);
    }
}

.index-job-title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: block;
    width: 100%;
    height: 100%;
    h2 {
        position: absolute;
        top: calc(50% - 6rem);
        left: 0%;
        display: block;
        width: 100%;
        text-align: center;
        line-height: 1;
        font-size: 12rem;
        font-weight: bold;
        color: #FFF;
        opacity: 0.7;
        animation-duration: .5s;
        animation-delay: .25s;
        animation-fill-mode: both;
    }
    .aos-animate & {
        h2 {
            animation-name: indexTitleAni;
        }
    }
    @media only screen and (max-width: 1280px) {
        h2 {
            font-size: 10rem;
        }
    }
    @media only screen and (max-width: 960px) {
        h2 {
            font-size: 16vw;
        }
        .aos-animate & {
            h2 {
                animation-name: indexTitleAni_t;
            }
        }
    }
}

.index-job-name {
    text-align: center;
    margin-bottom: 5rem;
    padding-top: 15rem;
    h2 {
        font-size: 3rem;
        color: #FFF;
        opacity: 0;
        animation-duration: .5s;
        animation-delay: .7s;
        animation-fill-mode: both;
    }
    .aos-animate & {
        h2 {
            animation-name: indexJobName;
        }
    }
    @media only screen and (max-width: 960px) {
        padding-top: 18vw;
        h2 {
            font-size: 6vw;
        }
        .aos-animate & {
            h2 {
                animation-name: indexJobName_t;
            }
        }
    }
    @media only screen and (max-width: 480px) {
        margin-bottom: 2rem;
    }
}

.index-job-text {
    display: flex;
    justify-content: space-between;
    max-width: 60rem;
    margin: 0 auto;
    hgroup {
        flex: 0 0 auto;
        position: relative;
        padding-left: 4rem;
        opacity: 0;
        animation-duration: .5s;
        animation-fill-mode: both;
        h3 {
            position: absolute;
            top: 0;
            left: 1.6rem;
            display: inline-block;
            height: 1.6rem;
            line-height: 1.6rem;
            font-size: 0.875em;
            // color: #FFF;
            background-color: var(--c1);
            border-radius: 0.8rem;
            padding: 0 1rem;
            transform: rotate(90deg);
            transform-origin: 0 0;
        }
        li {
            // list-style-type: none;
            line-height: 1.5;
            color: #FFF;
            padding: 0.25rem 0;
        }
    }
    .aos-animate & {
        hgroup {
            animation-name: fadeUp;
            &:nth-child(1) {
                animation-delay: 1s;
            }
            &:nth-child(2) {
                animation-delay: 1.2s;
            }
            &:nth-child(3) {
                animation-delay: 1.4s;
            }
        }
    }
    @media only screen and (max-width: 960px) {
        .aos-animate & {
            hgroup {
                animation-name: fadeUp_t;
            }
        }
    }
    @media only screen and (max-width: 768px) {
        hgroup {
            text-align: center;
            margin-bottom: 2rem;
            padding-left: 0;
            h3 {
                position: relative;
                left: 0;
                display: inline-block;
                margin-bottom: 1rem;
                transform: rotate(0);
            }
            li {
                list-style-type: none;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
    @media only screen and (max-width: 480px) {
        flex-wrap: wrap;
        hgroup {
            flex: 1 1 100%;
        }
    }
}

// hiker
.index-hiker-wrap {
    position: relative;
    background-color: #FFF;
    overflow: hidden;
}

.index-hiker-ceter {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0 auto;
    padding-bottom: 8rem;
    .more-button {
        opacity: 0;
        animation-duration: .5s;
        animation-delay: 1.4s;
        animation-fill-mode: both;
    }
    &.aos-animate {
        .more-button {
            animation-name: fadeIn;
        }
    }
    @media only screen and (max-width: 768px) {
        min-height: 0;
    }
    @media only screen and (max-width: 480px) {
        padding-bottom: 6rem;
    }
}

.index-hiker-title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: block;
    width: 100%;
    height: 100%;
    h2 {
        position: absolute;
        top: calc(50% - 6rem);
        left: 0%;
        display: block;
        width: 100%;
        text-align: center;
        line-height: 1;
        font-size: 12rem;
        font-weight: bold;
        color: var(--black);
        opacity: 0.7;
        animation-duration: .5s;
        animation-delay: .25s;
        animation-fill-mode: both;
    }
    .aos-animate & {
        h2 {
            animation-name: indexTitleAni;
        }
    }
    @media only screen and (max-width: 1280px) {
        h2 {
            font-size: 10rem;
        }
    }
    @media only screen and (max-width: 960px) {
        h2 {
            font-size: 16vw;
        }
        .aos-animate & {
            h2 {
                animation-name: indexTitleAni_t;
            }
        }
    }
}

.index-hiker-name {
    text-align: center;
    margin-bottom: 5rem;
    padding-top: 15rem;
    h2 {
        font-size: 3rem;
        color: var(--black);
        opacity: 0;
        animation-duration: .5s;
        animation-delay: .7s;
        animation-fill-mode: both;
    }
    .aos-animate & {
        h2 {
            animation-name: indexHikerName;
        }
    }
    @media only screen and (max-width: 960px) {
        padding-top: 18vw;
        h2 {
            font-size: 6vw;
        }
        .aos-animate & {
            h2 {
                animation-name: indexHikerName_t;
            }
        }
    }
    @media only screen and (max-width: 480px) {
        margin-bottom: 2rem;
    }
}

  
.index-hiker-marquee {
    position: relative;
    z-index: 10;
    display: flex;
    white-space: nowrap;
    gap: 1rem;
    overflow: hidden;
    opacity: 0;
    animation-duration: .5s;
    animation-delay: 1s;
    animation-fill-mode: both;
    .aos-animate & {
        animation-name: fadeIn;
    }
    @media only screen and (max-width: 960px) {
        animation-name: fadeIn_t;
    }
}
  
.index-hiker-photo {
    width: 20rem;
    height: 24rem;
    flex-shrink: 0;
    background-size: cover;
    background-position: 45% 50%;
    margin-bottom: 1rem;
    transition: all .5s;
    &:hover {
        background-position: 55% 50%;
    }
    @media only screen and (max-width: 768px) {
        width: 15rem;
        height: 18rem;
    }
}

.index-hiker-photo {
    &:nth-of-type(1),
    &:nth-of-type(16) {
        background-image: url("/images/index/photo01.jpg");
    }
    &:nth-of-type(2),
    &:nth-of-type(17) {
        background-image: url("/images/index/photo02.jpg");
    }
    &:nth-of-type(3),
    &:nth-of-type(18) {
        background-image: url("/images/index/photo03.jpg");
    }

    &:nth-of-type(4),
    &:nth-of-type(19) {
        background-image: url("/images/index/photo04.jpg");
    }

    &:nth-of-type(5),
    &:nth-of-type(20) {
        background-image: url("/images/index/photo05.jpg");
    }

    &:nth-of-type(6),
    &:nth-of-type(21) {
        background-image: url("/images/index/photo06.jpg");
    }

    &:nth-of-type(7),
    &:nth-of-type(22) {
        background-image: url("/images/index/photo07.jpg");
    }

    &:nth-of-type(8),
    &:nth-of-type(23) {
        background-image: url("/images/index/photo08.jpg");
    }

    &:nth-of-type(9),
    &:nth-of-type(24) {
        background-image: url("/images/index/photo09.jpg");
    }

    &:nth-of-type(10),
    &:nth-of-type(25) {
        background-image: url("/images/index/photo10.jpg");
    }

    &:nth-of-type(11),
    &:nth-of-type(26) {
        background-image: url("/images/index/photo11.jpg");
    }

    &:nth-of-type(12),
    &:nth-of-type(27) {
        background-image: url("/images/index/photo12.jpg");
    }

    &:nth-of-type(13),
    &:nth-of-type(28) {
        background-image: url("/images/index/photo13.jpg");
    }

    &:nth-of-type(14),
    &:nth-of-type(29) {
        background-image: url("/images/index/photo14.jpg");
    }

    &:nth-of-type(15),
    &:nth-of-type(30) {
        background-image: url("/images/index/photo15.jpg");
    }
}
</style>