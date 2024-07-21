<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, onUpdated, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router';
import QrcodeVue from '@chenfengyuan/vue-qrcode';
    
// 引用組件
import Banner from "@/components/Common/Banner.vue";
import SvgIcons from "@/components/SvgIcons.vue";
import Loading from "@/components/Loading.vue";

// 引用功能
import useBodyClass from "@/hooks/useBodyClass";
import useNoScroll from "@/hooks/useNoScroll";
import fetchData from "@/hooks/fetchData";

// 載入 pinia stores
import { useStatus } from '@/stores/status';
// 載入 pinia stores
import { useBaseInfo } from "@/stores/baseInfo";

// 從 store 取得 data
const statusStore = useStatus();
const baseInfo = useBaseInfo();

// 傳 class name 給 body
useBodyClass("is-about");

/* about */
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

// 視差滾動
const parallax = () => {
    if (typeof Parallax !== 'undefined') {
        var bg = document.getElementById("parallaxStage");
        var parallax_sk = new Parallax(bg, {
            // limitY: 0,
        });
    }
};

// 生命鉤子
onMounted(() => {
    parallax();
});

onUpdated(() => {
    parallax();
});

// 切換頁籤並移動至頂部
const isActive = ref(1);
const scrollToTop = (section) => {
    // 定義 isActive 值
    isActive.value = section;

    // 頁面移動至頂部
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* 專案作品 */
const jsonData = ref([]);
const selectedItem = ref(null);
const currentIndex = ref(0);
const isDataLoaded = ref(false);

// 取得 JSON 資料
const loadData = async () => {
    await fetchData(jsonData, 'worksList', false, true);
    isDataLoaded.value = true;
};

onBeforeMount(loadData);

/* 動態滾動載入資料 */
// 預設載入的資料筆數
const defaultItemCount = 15;

// 追蹤目前已經載入的資料數量
const loadedItemCount = ref(defaultItemCount);

// 計算顯示在頁面上的資料
const displayedItems = computed(() => jsonData.value.slice(0, loadedItemCount.value));

// 滾動加載更多資料的處理函式
const handleScroll = () => {
    // 如果目前載入的資料數量小於 JSON 資料的總數，並且滾動到了頁面底部
    if (loadedItemCount.value < jsonData.value.length && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // 加載下一批資料
        loadedItemCount.value += defaultItemCount;
    }
};

// 監聽滾動事件
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// 組件被卸載時移除滾動事件的監聽
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});


/* 彈窗 */
// 點擊作品縮圖觸發彈窗
const openPopup = (item, index) => {
    currentIndex.value = index;
    selectedItem.value = item;
    statusStore.POPUP_OVERLAY = true;
    useNoScroll(true);
};

// 上一筆
const loadPrevItem = () => {
    currentIndex.value--;
    if (currentIndex.value < 0) {
        currentIndex.value = jsonData.value.length - 1;
    }
    selectedItem.value = jsonData.value[currentIndex.value];
};

// 下一筆
const loadNextItem = () => {
    currentIndex.value++;
    if (currentIndex.value >= jsonData.value.length) {
        currentIndex.value = 0;
    }
    selectedItem.value = jsonData.value[currentIndex.value];
};

// 關閉彈窗
const popupClose = () => {
    selectedItem.value = null;
    statusStore.POPUP_OVERLAY = false;
    useNoScroll(false);
};

/* 偵測使用者是否按下瀏覽器上一頁按扭 */
// Handler for popstate event
const handlePopState = () => {
    selectedItem.value = null;
    statusStore.POPUP_OVERLAY = false;
    useNoScroll(false);
};

// 監聽 popstate 事件
onMounted(() => {
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState);
});
</script>

<template>
    <section class="pages-wrap">
        <Banner />
        <div class="about-center">
            <div class="about-photo">
                <figure>
                    <i></i>
                    <span id="parallaxStage">
                        <b data-depth="0.5"></b>
                    </span>
                </figure>
            </div>
            <div class="about-main">
                <div class="about-nav">
                    <ul>
                        <li>
                            <button :class="isActive==1 ? 'is-active' : ''" @click="scrollToTop(1)">基本資料</button>
                        </li>
                        <li>
                            <button :class="isActive==2 ? 'is-active' : ''" @click="scrollToTop(2)">技能專長</button>
                        </li>
                        <li>
                            <button :class="isActive==3 ? 'is-active' : ''" @click="scrollToTop(3)">專案作品</button>
                        </li>
                    </ul>
                    <figure>
                        <a href="https://github.com/trongtrong03" target="_blank" class="lnk-github" title="GitHub">
                            <SvgIcons name="githubIcon" />
                            <span>GitHub</span>
                        </a>
                        <a href="https://codepen.io/itrong" target="_blank" class="lnk-codepen" title="Codepen">
                            <SvgIcons name="codepenIcon" />
                            <span>Codepen</span>
                        </a>
                        <a href="https://www.instagram.com/ttrong.hiker/" target="_blank" class="lnk-instagram" title="Instagram">
                            <SvgIcons name="instagramIcon" />
                            <span>Instagram</span>
                        </a>
                        <a href="https://www.linkedin.com/in/%E9%9F%8B%E7%BF%B0-%E9%99%B3-58a9921b3/" target="_blank" class="lnk-linkedin" title="Linkedin">
                            <SvgIcons name="linkedinIcon" />
                            <span>Linkedin</span>
                        </a>
                    </figure>
                </div>
                <div class="about-tabs">
                    <div class="about-content" v-if="isActive==1">
                        <div class="about-datalist">
                            <ul>
                                <li>
                                    <h3>Name</h3>
                                    <p>陳韋翰<b>（壯壯）</b></p>
                                </li>
                                <li>
                                    <h3>Birthday</h3>
                                    <p>1989.8.6</p>
                                </li>
                                <li>
                                    <h3>Live</h3>
                                    <p>台中</p>
                                </li>
                                <li>
                                    <h3>Interest</h3>
                                    <p>登山 / 慢跑 / 籃球 / 健身 / 手工藝</p>
                                </li>
                                <li>
                                    <h3>E-mail</h3>
                                    <p>
                                        <a :href="'mailto:' + baseInfo.EMAIL" target="_blank" class="mail-icon" title="Mail to me">
                                            <span v-text="baseInfo.EMAIL"></span>
                                            <SvgIcons name="mailIcon" />
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <h3>Edu</h3>
                                    <p>國立彰化師範大學資管系</p>
                                </li>
                                <li>
                                    <h3>Exp</h3>
                                    <ol>
                                        <li>
                                            <time>2013.06 ~ 2016.03</time>
                                            <span><i>里陽數位科技</i><i>網頁設計師</i></span>
                                        </li>
                                        <li>
                                            <time>2016.04 ~ 2023.12</time>
                                            <span><i>中佑資訊</i><i>網頁前端工程師</i></span>
                                        </li>
                                        <li>
                                            <time>2018.04 ~</time>
                                            <span><i>Kiwigo 奇果，創意設計</i><i>接案前端工程師</i></span>
                                        </li>
                                        <li>
                                            <time>2020.10 ~</time>
                                            <span><i>山水雲林</i><i>接案前端工程師</i></span>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <h3>Motto</h3>
                                    <p>莫忘初衷</p>
                                </li>
                                <li>
                                    <h3>Intro</h3>
                                    <p>
                                        <span>嗨，我是韋翰，從事網頁設計已有十多年餘載，主要負責前端切版方面的工作，偶爾客串架構規劃與切版小老師，不敢妄稱自己能力出眾，但從零開始慢慢堆砌的經驗與熱忱，成為我在這個領域闖蕩多年的優勢。</span>
                                        <span><br></span>
                                        <span>高中文組出身，和許多同組學子一樣，對寫程式興致缺缺，連大學就讀彰師大資管系亦皆以「設計」相關學分作為主修。然而，進入職場沒多久便深刻體悟到自身設計競爭力在碩大市場可謂乏善可陳，經過幾番「洗禮」，決定學習架設網站並充實個人作品，以突破停滯不前的現狀。意外地在自主鑽研網頁程式語言期間，慢慢喜歡上了寫程式，如果要探究箇中原由，那肯定是出於獨立完成一個網站後產生的成就感吧，即便時至今日，我也依然對於能成功交付任何一個專案感到自豪。</span>
                                        <span><br></span>
                                        <span>儘管起步比許多專科從業人士晚，但我仍舊保持持續學習、充實自己的心態，這也正是我對待人生的寫照──不是正在探索，就是在前往探索的路上。</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="about-content" v-if="isActive==2">
                        <div class="about-skilllist">
                            <hgroup>
                                <h2>Programming Language</h2>
                                <ul>
                                    <li>
                                        <p>
                                            <i class="icon icon-html5"></i>
                                            <i class="icon icon-haml"></i>
                                            <i class="icon icon-pug"></i>
                                            <i class="icon icon-svg"></i>
                                            <span></span>
                                            <i class="icon icon-css3"></i>
                                            <i class="icon icon-sass"></i>
                                            <i class="icon icon-stylus"></i>
                                            <!-- <i class="icon icon-less"></i> -->
                                            <!-- <i class="icon icon-tailwindcss"></i> -->
                                            <span></span>
                                            <i class="icon icon-javascript"></i>
                                            <i class="icon icon-jquery"></i>
                                            <i class="icon icon-nodejs"></i>
                                            <!-- <i class="icon icon-typescript"></i> -->
                                            <i class="icon icon-vue"></i>
                                            <!-- <i class="icon icon-vuex"></i> -->
                                            <i class="icon icon-nuxt"></i>
                                            <i class="icon icon-vite"></i>
                                            <!-- <i class="icon icon-vuetify"></i> -->
                                            <!-- <i class="icon icon-react"></i> -->
                                            <!-- <i class="icon icon-angular"></i> -->
                                            <!-- <i class="icon icon-ajax"></i> -->
                                        </p>
                                    </li>
                                </ul>
                            </hgroup>
                            <hgroup>
                                <h2>Design Software</h2>
                                <ul>
                                    <li>
                                        <p>
                                            <i class="icon icon-adobe-ps"></i>
                                            <i class="icon icon-adobe-ai"></i>
                                            <i class="icon icon-adobe-xd"></i>
                                            <i class="icon icon-adobe-ae"></i>
                                            <span></span>
                                            <i class="icon icon-figma"></i>
                                        </p>
                                    </li>
                                </ul>
                            </hgroup>
                            <hgroup>
                                <h2>Development Tools</h2>
                                <ul>
                                    <li>
                                        <p>
                                            <i class="icon icon-git"></i>
                                            <span></span>
                                            <i class="icon icon-vscode"></i>
                                            <i class="icon icon-sublime"></i>
                                        </p>
                                    </li>
                                </ul>
                            </hgroup>
                        </div>
                    </div>
                    <div class="about-content" v-if="isActive==3">
                        <div class="works-wrap">
                            <div class="works-head">
                                <p>工作內容：</p>
                                <ul>
                                    <li>前端設計切版</li>
                                    <li>RWD 響應式網頁設計</li>
                                    <li>動態效果開發</li>
                                    <li>網頁效能優化</li>
                                    <li>網頁建議與規劃</li>
                                </ul>
                                <p><strong>※ 本作品集僅供面試參考，請勿外傳或作其他任何用途，謝謝。</strong></p>
                            </div>
                            <div class="works-list" v-if="isDataLoaded">
                                <div class="works-item" v-for="(item, index) in displayedItems" :key="index" @click="openPopup(item, index);">
                                    <span :style="{ 'background-image': 'url(/images/works/A' + item.img + '.jpg)'}"></span>
                                    <div class="works-info">
                                        <time v-text="item.year"></time>
                                        <h2 v-text="item.title"></h2>
                                    </div>
                                    <SvgIcons name="eyeIcon1" />
                                </div>
                            </div>
                            <div class="list-loading" v-else>
                                <Loading />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- popup -->
    <div class="works-popup-wrap" v-if="selectedItem">
        <div class="works-popup-flex">
            <div class="works-popup-img">
                <figure>
                    <img :src="'/images/works/A' + selectedItem.img + '.jpg'">
                </figure>
            </div>
            <div class="works-popup-content">
                <div class="text">
                    <h2 v-text="selectedItem.title"></h2>
                    <p>專案時間：{{ selectedItem.year }}</p>
                    <p>
                        <span>網站類型：{{ selectedItem.type }}</span>
                    </p>
                    <p>
                        <span>專案來源：{{ selectedItem.from }}</span>
                    </p>
                    <p>
                        <span>專案描述：</span>
                        <span>{{ selectedItem.desc }}</span>
                    </p>
                </div>
                <div class="qrcode" v-if="selectedItem.href">
                    <a :href="baseInfo.WEBSITE + '/__work/' + selectedItem.img + '/'" target="_blank">
                        <QrcodeVue :value="baseInfo.WEBSITE + '/__work/' + selectedItem.img + '/'" />
                        <SvgIcons name="linkIcon" />
                    </a>
                </div>
                <div class="btn">
                    <button class="btn-prev" @click="loadPrevItem"></button>
                    <button class="btn-next" @click="loadNextItem"></button>
                </div>
            </div>
        </div>
        <button class="popup-close" @click="popupClose">
            <SvgIcons name="closeIcon" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.about-center {
    position: relative;
    z-index: 5;
    max-width: 60rem;
    min-height: 100vh;
    min-height: 100dvh;
    margin: 0 auto;
}

.about-photo {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    z-index: 6;
    width: 12rem;
    height: 12rem;
    opacity: 0;
    animation-name: aboutAni;
    animation-duration: .3s;
    animation-delay: .6s;
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
            animation-name: aboutImg;
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
    @media only screen and (max-width: 960px) {
        opacity: 1;
        animation-name: none;
    }
    @media only screen and (max-width: 768px) {
        width: 10rem;
        height: 10rem;
        figure {
            i {
                transform: rotate(0);
                animation-name: none;
            }
        }
    }
    @media only screen and (max-width: 480px) {
        position: relative;
        width: 7.5rem;
        height: 7.5rem;
        margin: 0 auto;
        figure {
            i {
                display: none;
            }
            span {
                flex: 1 1 100%;
                height: 100%;
            }
        }
    }
}

.about-main {
    position: relative;
    padding-top: 10rem;
    // padding-left: 16rem;
    animation-name: fadeIn;
    animation-duration: .5s;
    animation-delay: 1.2s;
    animation-fill-mode: both;
    @media only screen and (max-width: 960px) {
        animation-name: none;
    }
    @media only screen and (max-width: 768px) {
        padding-top: 6rem;
    }
    @media only screen and (max-width: 480px) {
        padding-top: 1rem;
    }
}

.about-nav {
    position: sticky;
    top: 1rem;
    left: 0;
    display: inline-block;
    vertical-align: top;
    width: 16rem;
    margin-top: 5rem;
    padding-right: 4rem;
    li {
        position: relative;
        list-style-type: none;
        line-height: 1.5;
        padding: 0.5rem 0;
    }
    button {
        position: relative;
        font-size: 1rem;
        padding-left: 1rem;
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            display: block;
            width: 6px;
            height: 6px;
            background-color: var(--black);
            border-radius: 100%;
            transform: translateY(-50%);
            transition: all .3s;
        }
        &.is-active {
            &::before {
                background-color: var(--c1);
            }
        }
    }
    figure {
        max-width: 10rem;
        border-top: 1px solid #E8E8E8;
        margin-top: 1rem;
        padding-top: 1rem;
        a {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            width: 2rem;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            color: var(--black);
            transition: all .3s;
            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                width: 1rem;
                fill: #444;
                transform: translate(-50%, -50%);
                transition: all .3s;
            }
            span {
                display: none;
            }
            &:hover {
                color: var(--c1);
                svg {
                    fill: var(--c1);
                }
            }
        }
    }
    @media only screen and (max-width: 768px) {
        top: 5rem;
        width: 12rem;
        padding-right: 2rem;
    }
    @media only screen and (max-width: 480px) {
        position: relative;
        top: 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 0;
        margin-bottom: 2rem;
        padding-right: 0;
        ul {
            order: 2;
            position: relative;
            display: flex;
            flex: 1 1 100%;
            padding: 0.5rem 0;
            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 50%;
                width: 120px;
                height: 1px;
                background-color: #E8E8E8;
                transform: translateX(-50%);
            }
            &:before {
                top: 0;
            }
            &::after {
                bottom: 0;
            }
        }
        li {
            flex: 1;
            text-align: center;
        }
        figure {
            order: 1;
            flex: 1 1 100%;
            text-align: center;
            border-top: 0;
            margin: 0 auto .5rem;
            padding-top: 0;
        }
    }
}


.about-tabs {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 16rem);
    @media only screen and (max-width: 768px) {
        width: calc(100% - 12rem);
    }
    @media only screen and (max-width: 480px) {
        width: 100%;
    }
}

.about-content {
    animation-name: fadeIn;
    animation-duration: .5s;
    animation-fill-mode: forwards;
}

.about-datalist {
    li {
        position: relative;
        display: flex;
        align-content: center;
        line-height: 2rem;
        padding: 0.75rem 0;
        h3 {
            flex: 0 0 5rem;
            min-width: 0;
            display: flex;
            font-size: 0.875em;
            color: #999;
            &::after {
                content: '.';
            }
        }
        p,
        ol {
            flex: 1;
            min-width: 0;
        }
        p {
            > span {
                display: block;
            }
            b {
                font-size: 0.75em;
                font-weight: normal;
                color: #999;
                margin-left: 0.5rem;
            }
        }
        li {
            display: block;
            margin-bottom: 0.5rem;
            padding: 0;
            time {
                display: block;
                line-height: 1.5;
                font-size: 0.75em;
            }
            span {
                display: block;
            }
            i {
                font-style: normal;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

a.mail-icon {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    color: var(--black);
    transition: all .3s;
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 0;
        display: block;
        width: 0;
        height: 1px;
        background-color: var(--black);
        transition: all .3s;
    }
    // &::after {
    //     content: '\f0e0';
    //     font-family: 'Font Awesome 5 Free';
    //     font-weight: 400;
    //     opacity: 0;
    //     transition: all .3s;
    // }
    svg {
        display: inline-block;
        vertical-align: middle;
        width: 1rem;
        fill: var(--black);
    }
    span {
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.5rem;
    }
    &:hover {
        &::before {
            width: 100%;
        }
        &::after {
            text-decoration: none;
            opacity: 1;
        }
    }
    @media only screen and (max-width: 768px) {
        &::before {
            display: none;
        }
        &::after {
            opacity: 1;
        }
        span {
            display: none;
        }
    }
}

.about-skilllist {
    padding-top: 2rem;
    hgroup {
        margin-bottom: 4rem;
        h2 {
            font-size: 1.25em;
            margin-bottom: 2rem;
        }
        li {
            list-style-type: none;
        }
        span {
            display: block;
        }
        i {
            display: inline-block;
            vertical-align: top;
            margin-bottom: 0.5rem;
            &::before {
                content: '';
                display: block;
                width: 4rem;
                height: 4rem;
                border-radius: 0.5rem;
                margin: 0 1rem;
            }
        }
    }
    @media only screen and (max-width: 480px) {
        hgroup {
            p {
                display: flex;
                flex-wrap: wrap;
            }
            i {
                flex: 0 0 25%;
                &::before {
                    width: calc(100% - 1rem);
                    max-width: 4rem;
                    margin: 0 auto;
                }
            }
            span {
                display: none;
            }
        }
    }
}

// works
.works-wrap {
    position: relative;
}

.works-head {
    line-height: 2;
    font-size: 0.875em;
    ul {
        margin-bottom: 1rem;
    }
    li {
        list-style-type: disc;
        list-style-position: inside;
    }
    p {
        strong {
            font-weight: normal;
            color: var(--red);
        }
    }
}

.works-list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    min-height: 30rem;
    @media only screen and (max-width: 960px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 320px) {
        grid-template-columns: repeat(1, 1fr);
    }
}

.works-item {
    position: relative;
    height: 15rem;
    overflow: hidden;
    cursor: pointer;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(#000, .5);
        opacity: 0;
        transition: opacity .3s;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        display: block;
        width: 2rem;
        fill: #FFF;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: all .3s;
    }
    span {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: 50% 0;
        background-size: cover;
        border-radius: 0.5rem;
    }
    &:hover {
        &::before {
            opacity: 1;
        }
        svg {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        .works-info {
            transform: translateY(0);
        }
    }
    @media only screen and (max-width: 960px) {
        height: 30vw;
    }
    @media only screen and (max-width: 768px) {
        height: 34vw;
    }
    @media only screen and (max-width: 480px) {
        height: auto;
        span {
            position: relative;
            height: 50vw;
        }
        &:hover {
            &::before,
            &::after {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 320px) {
        span {
            height: 70vw;
        }
    }
}

.works-info {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: block;
    width: 100%;
    color: #FFF;
    background-color: rgba(#000, .8);
    padding: .5rem 1rem;
    transform: translateY(100%);
    transition: transform .3s;
    time,
    h2 {
        line-height: 1.5;
        font-size: .75em;
        font-weight: normal;
    }
    time {
        color: rgba(#FFF, .5);
    }
    @media only screen and (max-width: 480px) {
        position: relative;
        color: var(--black);
        background-color: transparent;
        padding: .5rem 0;
        transform: translateY(0);
        time {
            display: none;
        }
    }
}

.works-popup-wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #fff;
    animation-name: fadeIn;
    animation-duration: .5s;
    animation-fill-mode: forward;
    @media only screen and (max-width: 960px) {
        top: 4rem;
        height: calc(100% - 4rem);
        padding-left: 0;
    }
    @media only screen and (max-width: 480px) {
        top: 3rem;
        height: calc(100% - 3rem);
    }
}

.works-popup-flex {
    display: flex;
    height: 100%;
    @media only screen and (max-width: 960px) {
        flex-wrap: wrap;
    }
}

.works-popup-img {
    display: flex;
    flex: 0 0 50%;
    align-items: center;
    justify-content: center;
    min-width: 0;
    height: 100%;
    figure {
        // display: flex;
        // align-items: center;
        height: 100%;
        background-color: #000;
        @include scrollbar;
    }
    img {
        display: block;
        width: 100%;
    }
    @media only screen and (max-width: 960px) {
        flex: 1 1 100%;
        order: 2;
        height: calc(100% - 12rem);
    }
    @media only screen and (max-width: 480px) {
        height: calc(100% - 9rem);
    }
}

.works-popup-content {
    flex: 0 0 50%;
    min-width: 0;
    @media only screen and (max-width: 960px) {
        flex: 1 1 100%;
        order: 1;
    }
}

.works-popup-content {
    position: relative;
    .text {
        padding: 4rem;
        h2 {
            line-height: 1.75;
            font-size: 2rem;
            margin-bottom: 2rem;
            @include text-truncate;
        }
        p {
            line-height: 1.75;
            font-size: 0.875rem;
            span {
                display: block;
            }
        }
    }
    .qrcode {
        position: absolute;
        bottom: 4rem;
        right: 2rem;
        display: block;
        width: 6rem;
        height: 6rem;
        // background-color: #fff;
        // padding: .5rem;
        a {
            position: relative;
            display: block;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                display: block;
                width: 100%;
                height: 100%;
                background-color: rgba(#000, .3);
                opacity: 0;
                transition: opacity .3s;
            }
            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: 2;
                display: block;
                width: 1.25rem;
                fill: var(--c1);
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: opacity .3s;
            }
            canvas {
                width: 100% !important;
                height: 100% !important;
            }
            img {
                position: relative;
                z-index: 0;
                display: block;
                width: 100%;
                transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
                transition: all .3s;
            }
            &:hover {
                &::before,
                svg {
                    opacity: 1;
                }
                img {
                    transform: translate3d(0, 0, 0) rotate(-0.1deg) scale(.8);
                }
            }
        }
    }
    .btn {
        position: absolute;
        bottom: 1rem;
        left: 0;
        width: 100%;
        text-align: center;
        button {
            display: inline-block;
            vertical-align: middle;
            color: #AAA;
            margin: 0 1rem;
            transition: color .3s;
            &.btn-prev {
                &::before {
                    content: 'Prev';
                }
            }
            &.btn-next {
                &::before {
                    content: 'Next';
                }
            }
            &:hover {
                color: var(--c1);
            }
        }
    }
    @media only screen and (max-width: 960px) {
        .text {
            height: 12rem;
            padding: 2rem 5rem 2rem 2rem;
            h2 {
                line-height: 1.2;
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }
        }
        .qrcode {
            display: none;
        }
        .btn {
            // position: fixed;
            top: 4rem;
            right: 0;
            left: auto;
            width: 4rem;
            height: 8rem;
            button {
                display: block;
                width: 100%;
                height: 50%;
                font-size: 1.5rem;
                background-color: #efefef;
                border-top: 1px solid #FFF;
                margin: 0;
                &::before {
                    font-family: var(--fonts);
                }
                &.btn-prev {
                    &::before {
                        content: '←';
                    }
                }
                &.btn-next {
                    &::before {
                        content: '→';
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 480px) {
        .text {
            height: 9rem;
            padding: 1rem 4rem 1rem 1rem;
            h2 {
                font-size: 1.25rem;
            }
            p {
                line-height: 1.5;
                &:nth-of-type(3),
                &:nth-of-type(4) {
                    display: none;
                }
            }
        }
        .btn {
            top: 3rem;
            width: 3rem;
            height: 6rem;
        }
    }
}
</style>