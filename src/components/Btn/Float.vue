<script setup lang="ts">
    import SvgIcons from "@/components/SvgIcons.vue";
    import { ref, onMounted, onBeforeMount, onUpdated, onBeforeUnmount, computed, watch } from "vue";
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const onBtnTopClick = () => {
        const duration = 500;
        const start = window.pageYOffset;
        let startTime = null;

        const animateScroll = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const easeInOutCubic = (t) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            const scrollTop =
            easeInOutCubic(Math.min(progress / duration, 1)) * (0 - start) + start;
            window.scrollTo(0, scrollTop);
            if (progress < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    const goBackClick = () => {
        const pathSegments = route.path.split('/');
        if (pathSegments.length > 2) {
            // 移除最後一個路徑段
            pathSegments.pop();
            const parentPath = pathSegments.join('/');
            router.push(parentPath);
        } else {
            router.push('/');
        }
    }

    const isShowButton = ref(false);
    const updateButtonVisibility = () => {
        isShowButton.value = window.scrollY > 400;
    };


    // mounted
    onMounted(async () => {
        onBtnTopClick();
        updateButtonVisibility();
        if (route.path.includes('learn/')) {
            setTimeout(copyCatelog, 1000);
        }
    });

    onBeforeMount(() => {
        // Add event listener
        window.addEventListener("scroll", updateButtonVisibility);
    });

    onBeforeUnmount(() => {
        // Remove event listener
        window.removeEventListener("scroll", updateButtonVisibility);
    });

    /* 判斷特定路由以觸發floatBtnShow */
    // 動態產生排除的路徑模式的正規表示式
    const excludePatterns = /^\/(logs|learn)\//;
    // 計算屬性，檢查是否在排除的路徑模式下
    const floatBtnShow = computed(() => excludePatterns.test(route.path));

    /* 目錄 */
    const isActive = ref(false);
    const isCatalogCopied = ref(false);

    const copyCatelog = () => {
        if (isCatalogCopied.value) return;

        // 取得需要操作的元素
        const floatCatalog = document.querySelector(".float-catalog");
        const textCatalogUl = document.querySelector(".text-catalog ul");

        // 確保元素存在
        if (floatCatalog && textCatalogUl) {
            // 克隆元素並將克隆的元素附加到 floatCatalog 中
            const clonedUl = textCatalogUl.cloneNode(true);
            floatCatalog.appendChild(clonedUl);
            isCatalogCopied.value = true;
        } else {
            console.error('Element not found:', { floatCatalog, textCatalogUl });
        }
    }

    const resetCatalogState = () => {
        isActive.value = false;
        isCatalogCopied.value = false;
    }

    watch(route, (newRoute) => {
        if (newRoute.path.includes('learn/')) {
            // 添加延遲以確保 DOM 完全加載
            setTimeout(copyCatelog, 1000);
        } else {
            resetCatalogState();
        }
    });

    onUpdated(() => {
        if (route.path.includes('learn/')) {
            // 取得克隆後的元素
            const clonedLis = document.querySelectorAll(".float-catalog ul li");

            // 添加事件监听器
            clonedLis.forEach(li => {
                li.addEventListener('click', (event) => {
                    // 当任意 li 元素被点击时，将 isActive 的值设置为 false
                    isActive.value = false;
                });
            });
        }
    });

    onBeforeUnmount(() => {
        resetCatalogState();
    });
</script>

<template>
    <div class="float-wrap" :class="floatBtnShow ? 'padding' : ''">
        <button @click="goBackClick" v-if="floatBtnShow">
            <SvgIcons name="arrowLeftIcon" />
        </button>
        <RouterLink to="/" v-if="floatBtnShow">
            <SvgIcons name="homeIcon" />
        </RouterLink>
        <template v-if="route.path.includes('learn/')">
            <button class="btn-list" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
                <SvgIcons name="listIcon" />
            </button>
            <div class="float-catalog" :class="{ 'is-active': isActive }"></div>
        </template>
        <button class="btn-top" :class="{ 'is-show': isShowButton }" @click="onBtnTopClick">
            <SvgIcons name="arrowUpIcon" />
        </button>
    </div>
</template>

<style lang="scss">
.float-wrap {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    // left: 50%;
    z-index: 96;
    display: block;
    background-color: rgba(#FFF, .7);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(#333, .2);
    // transform: translateX(-50%);
    transition: background .3s;
    &.padding {
        padding: .25rem .5rem;
    }
    > a,
    > button {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 1rem;
        color: var(--black);
        border: 0;
        transition: color .3s;
        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            width: 1rem;
            fill: #333;
            transform: translate(-50%, -50%);
            transition: all .3s;
        }
        &.btn-top {
            display: none;
            &.is-show {
                display: inline-block !important;
            }
        }
        &:hover,
        &.is-active {
            svg {
                fill: var(--c1)
            }
        }
    }
    &:hover {
        background-color: #FFF;
    }
}

.float-catalog {
    position: absolute;
    bottom: 3.5rem;
    right: 0;
    z-index: 50;
    display: none;
    width: 16rem;
    background-color: #FFF;
    border-radius: 1rem;
    filter: drop-shadow(0 2px 4px rgba(#333, .2));
    padding: 1rem 0;
    &::before {
        content: '';
        position: absolute;
        bottom: -7px;
        right: 1rem;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: .5rem .5rem 0 .5rem;
        border-color: #FFF transparent transparent transparent;
    }
    li {
        list-style-type: none;
        line-height: 1.5;
        font-size: 0.813rem;
        a {
            display: block;
            color: var(--black);
            padding: .25rem 1rem;
            transition: color .3s, background .3s;
            &:hover {
                color: var(--href);
                background-color: #f7f7f7;
            }
        }
    }
    &.is-active {
        display: block;
        animation-name: fadeIn;
        animation-duration: .5s;
        animation-fill-mode: forward;
    }
    @media only screen and (max-width: 768px) {
        width: 75vw;
        max-height: calc(100vh - 12rem);
        overflow-y: auto;
    }
    @media only screen and (max-width: 480px) {
        width: calc(100vw - 2rem);
    }
}
</style>