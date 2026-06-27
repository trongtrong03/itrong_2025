<script setup lang="ts">
    import { computed, onMounted } from "vue";
    import { useRoute } from 'vue-router';
    import useBodyClass from "@/hooks/useBodyClass";
    import { useInfoStore } from '@/stores/datalist';
    import SvgIcons from "@/components/SvgIcons.vue";
    import Banner from "@/components/Common/Banner.vue";
    import HikingbookProgress from './_progress.vue';
    import HikingbookLatestMountains from './_latestMountains.vue';
    import HikingbookLatestArticles from './_latestArticles.vue';
    import HikingbookGallery from './_gallery.vue';
    import HikingbookLinks from './_links.vue';
    import HikingbookCalendar from './_calendar.vue';

    // 頁面共用狀態與路由資訊
    const infoStore = useInfoStore();
    const route = useRoute();

    useBodyClass("is-hikingbook");

    // 載入 Hiking Book 導覽連結
    onMounted(() => infoStore.loadHKLinks());

    // 控制首頁與子頁共用版面顯示
    const isIndexRoute = computed(() => route.path === '/hikingbook');
    const subPagesHide = computed(() => !/^\/[^\/]+\/[^\/]+/.test(route.path));
</script>

<template>
    <section :class="subPagesHide ? 'pages-wrap' : ''">
        <Banner v-if="subPagesHide" />
        <div class="main-center">
            <div class="main-head" v-if="subPagesHide">
                <h1>Hiking Book</h1>
            </div>
            <div class="hikingbook-wrap">
                <div class="hikingbook-nav" v-if="subPagesHide">
                    <ul>
                        <li v-for="item in infoStore.HK_LINKS" :key="item.id">
                            <RouterLink :to="'/' + item.link">
                                <SvgIcons :name="'hkIcon' + item.id" />
                                <span v-text="item.title"></span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="hikingbook-page" v-if="isIndexRoute">
                    <div class="hikingbook-head">
                        <p>在登山中，只有兩個等級：可以，或不能。</p>
                        <p>我們必須要朝著頂端不斷攀爬，才能看到更遠的景色，只有在冒險中，我們才能找到真正的自己。</p>
                    </div>
                    <div class="hikingbook-flex">
                        <div class="hikingbook-f1">
                            <HikingbookProgress />
                        </div>
                        <div class="hikingbook-f2">
                            <HikingbookLatestMountains />
                            <HikingbookLatestArticles />
                        </div>
                    </div>
                    <div class="hikingbook-block hikingbook-gallery">
                        <h2>影像故事</h2>
                        <HikingbookGallery />
                    </div>
                    <div class="hikingbook-block hikingbook-link">
                        <h2>相關資源</h2>
                        <HikingbookLinks />
                    </div>
                    <div class="hikingbook-block hikingbook-calendar">
                        <h2>里程碑</h2>
                        <HikingbookCalendar />
                    </div>
                </div>
                <RouterView/>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .hikingbook-wrap {
        position: relative;
        animation-name: fadeUp02;
        animation-duration: 0.5s;
        animation-delay: 0.75s;
        animation-fill-mode: both;
        @media only screen and (max-width: 960px) {
            animation-name: fadeUp02_t;
        }
    }

    .hikingbook-page {
        animation-name: fadeIn;
        animation-duration: .5s;
        animation-fill-mode: both;
    }

    .hikingbook-nav {
        position: relative;
        z-index: 10;
        ul {
            display: flex;
            background-color: rgba(#FFF, .2);
            border-radius: 0.5rem;
            padding: 1rem;
        }
        li {
            list-style-type: none;
            flex: 1;
            min-width: 0;
            margin-right: 1rem;
            a {
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
                gap: .5rem;
                width: 100%;
                height: 2.5rem;
                color: var(--black);
                background-color: #fff;
                border-radius: 0.5rem;
                transition: all .3s;
                svg {
                    width: 1.25rem;
                    fill: var(--black);
                    transition: all .3s;
                }
                span {
                    font-size: 1rem;
                    margin-top: 2px;
                }
                &:hover,
                &.router-link-exact-active {
                    background-color: var(--c1);
                    svg {
                        width: 1.25rem;
                    }
                }
            }
            &:last-child {
                margin-right: 0;
            }
        }
        @media only screen and (max-width: 768px) {
            ul {
                padding: 0.5rem;
            }
            li {
                margin-right: 0.5rem;
                a {
                    font-size: 1.25rem;
                    span {
                        display: none;
                    }
                }
                &.lnk-back {
                    display: block;
                }
            }
        }
        @media only screen and (max-width: 480px) {
        }
    }

    .hikingbook-head {
        margin-bottom: 2rem;
        padding-top: 4rem;
        p {
            line-height: 2;
            font-size: 0.875em;
        }
        @media only screen and (max-width: 480px) {
            display: none;
        }
    }

    .hikingbook-inside {
        min-height: 40rem;
    }

    .hikingbook-flex {
        display: flex;
        @media only screen and (max-width: 768px) {
            flex-wrap: wrap;
        }
        @media only screen and (max-width: 480px) {
            margin-top: 2rem;
        }
    }

    .hikingbook-f1,
    .hikingbook-f2 {
        > div {
            padding: 1rem;
            h2 {
                font-size: .75em;
                color: #999;
            }
        }
    }

    .hikingbook-f1 {
        flex: 0 0 15rem;
        min-width: 0;
        background-color: #F7F7F7;
        border-radius: 0.5rem;
        @media only screen and (max-width: 960px) {
            flex: 0 0 12rem;
        }
        @media only screen and (max-width: 768px) {
            flex: 1 1 100%;
            margin-bottom: 1rem;
        }
    }

    .hikingbook-f2 {
        flex: 1;
        min-width: 0;
        margin-left: 1rem;
        > div {
            background-color: #F7F7F7;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        @media only screen and (max-width: 768px) {
            flex: 1 1 100%;
            margin-left: 0;
        }
    }

    .hikingbook-block {
        position: relative;
        margin-top: 4rem;
        > h2 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }
        @media only screen and (max-width: 480px) {
            margin-top: 2rem;
        }
    }

    :deep(.hikingbook-inside) {
        .hikingbook-block {
            margin-top: 4rem;
        }
        @media only screen and (max-width: 480px) {
            margin-top: 2rem;
        }
    }

    // link
    .hikingbook-link {
        ul {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-column-gap: 2px;
            grid-row-gap: 2px;
        }
        li {
            list-style-type: none;
            min-width: 0;
            figure {
                position: relative;
                border: 1px solid #F7F7F7;
                border-radius: 0.5rem;
                margin-bottom: 0.5rem;
                overflow: hidden;
                img {
                    display: block;
                    width: 100%;
                    transform: translate3d(0, 0, 0) scale(1) rotate(0.1deg);
                    transition: transform .3s;
                }
                figcaption {
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
                    background-color: rgba(#000, .7);
                    opacity: 0;
                    transition: opacity .3s;
                    a {
                        display: flex;
                        flex: 1 1 100%;
                        align-content: center;
                        align-items: center;
                        justify-content: center;
                        min-width: 0;
                        height: 100%;
                        text-align: center;
                        font-size: 1.25rem;
                        color: #FFF;
                        transition: color .3s;
                        svg {
                            width: 20px;
                            fill: var(--c1);
                        }
                        &:hover {
                            color: var(--c1);
                        }
                    }
                }
                &:hover {
                    img {
                        transform: translate3d(0, 0, 0) scale(1.1) rotate(0.1deg);
                    }
                    figcaption {
                        opacity: 1;
                    }
                }
            }
            hgroup {
                h2 {
                    display: block;
                    line-height: 1.5;
                    text-align: center;
                    font-size: 0.875rem;
                }
            }
        }
        @media only screen and (max-width: 1280px) {
            ul {
                grid-template-columns: repeat(7, 1fr);
            }
        }
        @media only screen and (max-width: 960px) {
            ul {
                display: block;
                white-space: nowrap;
                overflow-x: auto;
                padding-bottom: 1rem;
            }
            li {
                display: inline-block;
                vertical-align: top;
                width: 7.5rem;
                margin-right: 0.5rem;
                hgroup {
                    h2 {
                        @include text-truncate;
                    }
                }
                &:last-child {
                    margin-right: 0;
                }
                
            }
        }
        @media only screen and (max-width: 480px) {
            li {
                width: 5rem;
            }
        }
    }

    .hikingbook-calendar {
        @media only screen and (max-width: 960px) {
            display: none;
        }
    }
</style>
