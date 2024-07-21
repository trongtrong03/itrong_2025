<script setup lang="ts">
    // 引用組件
    import SvgIcons from "@/components/SvgIcons.vue";

    // 引用功能
    import { ref, onMounted, onBeforeUnmount } from "vue";
    import { RouterLink } from "vue-router";
    
    // 載入 pinia stores
    import { useInfoStore } from '@/stores/datalist';
    import { useNavToggle } from "@/stores/navToggle";

    // 從 store 取得 data
    const infoStore = useInfoStore();
    const navToggle = useNavToggle();

    onMounted(() => {
        infoStore.loadNavs();
    });

    const navActive = ref<boolean>(false);

    // nav active event
    const navToggleActive = (): void => {
        navToggle.navActive = !navToggle.navActive;
        if (navActive.value) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };
    const navToggleActiveRemove = (): void => {
        navToggle.navActive = false;
        document.body.classList.remove('no-scroll');
    };

    // 監聽 popstate 事件，並在事件觸發時重置 navActive 狀態
    const handlePopState = (): void => {
        navToggle.navActive = false;
    };

    // 監聽 popstate 事件
    onMounted(() => {
        window.addEventListener('popstate', handlePopState);
    });

    // 在組件被卸載前移除 popstate 事件的監聽器，以免造成內存洩漏
    onBeforeUnmount(() => {
        window.removeEventListener('popstate', handlePopState);
    });
</script>

<template>
    <header class="header-wrap" :class="{ 'is-active': navActive }">
        <figure class="logo-wrap">
            <RouterLink to="/" @click="navToggleActiveRemove">
                <SvgIcons name="Logo" />
            </RouterLink>
        </figure>
        <nav class="nav-wrap" :class="navToggle.navActive==true ? 'is-active' : ''">
            <div class="nav-link" v-for="item in infoStore.NAV_LIST" :key="item.id">
                <RouterLink :to="'/' + item.en" @click="navToggleActiveRemove" :class="'lnk-' + item.en" :title="item.ch">
                    <SvgIcons :name="'navLinkIcon' + item.id" />
                    <span v-text="item.ch"></span>
                </RouterLink>
            </div>
        </nav>
        <button class="nav-btn" aria-label="Nav Button" :class="navToggle.navActive==true ? 'is-active' : ''" @click="navToggleActive">
            <span><b></b><b></b><b></b><b></b></span>
        </button>
    </header>
</template>

<style lang="scss" scoped>
// header
.header-wrap {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 991;
    display: block;
    width: 3rem;
    height: 100%;
    background: linear-gradient(to bottom, #000000 0%,#000000 50%,#333 100%);
    // animation-name: slideLeft;
    // animation-duration: .5s;
    // animation-delay: .75s;
    // animation-fill-mode: both;
    @media only screen and (max-width: 960px) {
        width: 100%;
        height: 4rem;
        background-color: var(--black);
        background-image: none;
        animation-name: none;
    }
    @media only screen and (max-width: 480px) {
        height: 3rem;
    }
}

// logo
.logo-wrap {
    position: relative;
    a {
        display: flex;
        width: 100%;
        height: 3rem;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
    svg {
        display: block;
        width: 80%;
        margin: 0 auto;
    }
    @media only screen and (max-width: 960px) {
        position: relative;
        z-index: 996;
        height: 100%;
        background-color: var(--black);
        a {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4rem;
            transform: translate(-50%, -50%);
        }
        svg {
            width: 100%;
        }
    }
}

:deep(.logo-wrap){
    svg {
        .st0 {
            fill-rule: evenodd;
            clip-rule: evenodd;
            fill: var(--c1);
        }
        .st1 {
            fill-rule: evenodd;
            clip-rule: evenodd;
            fill: #FFF;
        }
        .st2 {
            fill: var(--c1);
        }
    }
}

// nav
.nav-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @media only screen and (max-width: 960px) {
        position: fixed;
        top: 4rem;
        left: 0;
        z-index: 995;
        display: block;
        width: 100%;
        height: calc(100vh - 4rem);
        height: calc(100dvh - 4rem);
        background-color: #000;
        padding: 4rem 0 2rem;
        overflow-y: auto;
        opacity: 0;
        transform: translateY(-100%);
        
        &.is-active {
            opacity: 1;
            transform: translateY(0%);
            transition: transform .3s, opacity .3s;
        }
    }
    @media only screen and (max-width: 480px) {
        top: 3rem;
        height: calc(100vh - 3rem);
        height: calc(100dvh - 3rem);
    }
}

.nav-item {
    position: relative;
    flex: 1 1 100%;
    @media only screen and (min-width: 961px) {
        &:hover {
            .nav-sub {
                display: block !important;
            }
        }
    }
}

.nav-link {
    position: relative;
    flex: 1 1 100%;
    a {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        height: 3rem;
        text-align: center;
        font-size: 1em;
        color: rgba(#FFF, .5);
        transition: all .3s;
        svg {
            display: inline-block;
            vertical-align: middle;
            width: 1.125rem;
        }
        span {
            display: none;
        }
        &:hover,
        &.is-active,
        &.router-link-active {
            color: var(--c1);
        }
    }
    @media only screen and (max-width: 960px) {
        a {
            height: 4rem;
            color: rgba(#FFF, .7);
            span {
                display: inline-block;
                color: rgba(#FFF, .7);
                margin-left: 1rem;
            }
            &.is-active {
                span {
                    color: var(--c1);
                }
            }
        }
    }
}

:deep(.nav-link){
    a {
        svg {
            fill: rgba(#FFF, .5);
        }
        &:hover,
        &.is-active,
        &.router-link-active {
            svg {
                fill: var(--c1);
            }
        }
    }
}

// button
.nav-btn {
    display: none;
    @media only screen and (max-width: 960px) {
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 999;
        display: block;
        width: 4rem;
        height: 4rem;
        transform: translateY(-50%);
        transition: transform 0.5s ease-in-out;
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            width: 2.5rem;
            height: 30px;
            transform: translate(-50%, -50%);

            b {
                position: absolute;
                left: 0;
                display: block;
                width: 100%;
                height: 2px;
                background-color: #FFF;
                margin-top: 5px;
                opacity: 1;
                transform: rotate(0deg);
                transition: width 0.25s ease-in-out, left 0.25s ease-in-out, transform 0.25s ease-in-out;

                &:nth-child(1) {
                    top: 0px;
                }

                &:nth-child(2),
                &:nth-child(3) {
                    top: 9px;
                }

                &:nth-child(4) {
                    top: 18px;
                }
            }
        }
        &.is-active {
            transform: translateY(-50%);
            span {
                b {
                    &:nth-child(1) {
                        left: 50%;
                        width: 0%;
                    }

                    &:nth-child(2) {
                        transform: rotate(45deg);
                    }

                    &:nth-child(3) {
                        transform: rotate(-45deg);
                    }

                    &:nth-child(4) {
                        left: 50%;
                        width: 0%;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 480px) {
        width: 3rem;
        height: 3rem;
        span {
            width: 2rem;
        }
    }
}
</style>
