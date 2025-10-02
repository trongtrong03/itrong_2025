<script setup lang="ts">
    import { ref, reactive, computed } from "vue";
    import type { CatalogItem } from '@/stores/catalog';

    // 引用組件
    import Banner from "@/components/Common/Banner.vue";
    import useBodyClass from "@/hooks/useBodyClass";
    import PrismHighlight from '@/components/Common/PrismHighlight.vue';
    import WsJavascript from './_javascript.vue';
    import WsJquery from './_jquery.vue';
    import WsVue from './_vue.vue';
    import WsVite from './_vite.vue';
    import WsTypescript from './_typescript.vue';
    import WsNodejs from './_nodejs.vue';
    import WsNuxt from './_nuxt.vue';
    import WsYarn from './_yarn.vue';
    import WsGit from './_git.vue';
    import WsCSS from './_css.vue';
    import WsHtml from './_html.vue';
    import WsFigma from './_figma.vue';
    import WsOthers from './_others.vue';

    // 傳 class name 給 body
    useBodyClass("is-workshop");

    /* workshop */
    // 導入各分類組件
    const componentsMap = {
        javascript: WsJavascript,
        jquery: WsJquery,
        vue: WsVue,
        vite: WsVite,
        typescript: WsTypescript,
        nodejs: WsNodejs,
        nuxt: WsNuxt,
        yarn: WsYarn,
        git: WsGit,
        css3: WsCSS,
        html5: WsHtml,
        figma: WsFigma,
        others: WsOthers,
    };

    const currentComponent = computed(() => componentsMap[btnSelected.value] || null);

    // 頁籤名稱
    const btnList = [
        'javascript', 'jquery', 'vue', 'vite', 'nuxt', 'typescript', 'nodejs', 'yarn', 'git', 'css3', 'html5', 'figma', 'others'
    ]

    // 切換
    const btnSelected = ref('javascript');
    const isActive = ref(0);
    const changeTab = (e) => {
        btnSelected.value = e;
        isActive.value = 0;

        // 頁面移動至頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const catalog = reactive<CatalogItem[]>([
        { id: 1, title: '錯誤訊息' },
        { id: 2, title: '警告提示' },
        { id: 3, title: '疑難雜症' },
    ]);
</script>

<template>
    <section class="pages-wrap">
        <Banner />
        <div class="main-center">
            <div class="main-head">
                <h1>Workshop</h1>
            </div>
            <div class="list-wrap">
                <div class="list-tools">
                    <div class="list-overflow">
                        <button
                            v-for="key in btnList"
                            :key="key"
                            class="list-btnicon icon"
                            :class="[`icon-${key}`, { 'is-active': btnSelected === key }]"
                            @click="changeTab(key)"
                        />
                    </div>
                </div>
                <div class="pages-title">
                    <h2 style="text-transform: capitalize;">{{ btnSelected }}</h2>
                </div>
                <div class="text-content">
                    <component
                        :is="currentComponent"
                        v-if="currentComponent"
                        v-model:isActive="isActive"
                        :catalog="catalog"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .text-group {
        animation-name: fadeUp;
        animation-duration: .5s;
        animation-fill-mode: both;
        > h2 {
            font-size: 1.25rem;
        }
    }

    .text-accordin {
        position: relative;
        margin-bottom: 2rem;
    }

    .accordin-item {
        position: relative;
        margin-bottom: 1rem;
    }

    .accordin-title {
        position: relative;
        padding: .5rem 1rem;
        cursor: pointer;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            border-width: 2px;
            border-style: solid;
            opacity: 0;
            pointer-events: none;
            transition: all .1s;
        }
        p {
            margin-bottom: 0;
            &::before {
                position: relative;
                display: inline-block;
                vertical-align: middle;
                width: 1.25rem;
                height: 1.25rem;
                line-height: 1.5rem;
                font-family: "Dongle", sans-serif;
                font-weight: 400;
                font-size: 1.25rem;
                text-align: center;
                color: #FFF;
                border-radius: 100%;
                margin-right: .5rem;
            }
        }
        .is-error & {
            color: #ed6363;
            background-color: #ffebeb;
            &::before {
                border-color: #ed6363;
            }
            p {
                &::before {
                    content: 'X';
                    background-color: #ed6363;
                }
            }
        }
        .is-warning & {
            color: #000;
            background-color: #fff9db;
            &::before {
                border-color: #ffe066;
            }
            p {
                &::before {
                    content: '!';
                    background-color: #ffe066;
                }
            }
        }
        .is-others & {
            color: #000;
            background-color: #ebf8ff;
            &::before {
                border-color: #63b3ed;
            }
            p {
                &::before {
                    content: 'i';
                    background-color: #63b3ed;
                }
            }
        }
        .is-tips & {
            color: #000;
            background-color: #cef3da;
            &::before {
                border-color: #38c985;
            }
            p {
                &::before {
                    content: '√';
                    background-color: #38c985;
                }
            }
        }
        &:hover,
        .is-active & {
            &::before {
                opacity: 1;
            }
        }
    }

    .accordin-content {
        position: relative;
        display: none;
        background-color: #fcfcfc;
        padding: 1rem 2rem 4rem;
        .is-active & {
            display: block;
        }
    }

    .accordin-close {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        z-index: 20;
        display: none;
        width: auto;
        font-size: 0.875rem;
        color: #AAA;
        padding: 0 .5rem;
        transform: translateX(-50%);
        transition: color .2s;
        &::before {
            content: '[close]';
        }
        &:hover {
            color: var(--black);
        }
        .is-active & {
            display: block;
        }
    }
</style>