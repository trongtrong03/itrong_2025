<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted, onUnmounted } from "vue";

// 引用組件
import Loading from "@/components/Loading.vue";

// 引用功能
import fetchData from "@/hooks/fetchData";

// 定義資料
const jsonData = ref<Array<any>>([]);
const isDataLoaded = ref(false);

// 取得 JSON 資料
const loadData = async () => {
    await fetchData(jsonData, 'mountainsLogs', false, true);
};

onBeforeMount(loadData);


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

// mounted
onMounted(async () => {
    isDataLoaded.value = true;
});
</script>

<template>
    <section class="hikingbook-inside">
        <div class="hikingbook-block hikingbook-logs fade-up" v-if="isDataLoaded">
            <div class="pages-title">
                <h2>登山心得</h2>
            </div>
            <ul>
                <li v-for="(item, index) in displayedItems" :key="index">
                    <RouterLink :to="'/mtlogs/' + item.id">
                        <figure>
                            <span :style="{ backgroundImage: 'url(images/logs/cover' + item.id + '.jpg)'}"></span>
                        </figure>
                        <h3 v-text="item.title"></h3>
                        <p v-text="item.desc"></p>
                        <time v-text="item.time"></time>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div class="list-loading" v-else>
            <Loading />
        </div>
    </section>
</template>

<style lang="scss" scoped>
.hikingbook-logs {
    li {
        list-style-type: none;
        margin-bottom: 1rem;
        a {
            position: relative;
            display: block;
            min-height: 10rem;
            padding: 1rem 0 2rem 17rem;
            transform: translate3d(0, 0, 0) scale(1) rotate(0.1deg);
            transition: transform .3s;
            figure {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                display: block;
                width: 15rem;
                height: 10rem;
                background-color: #fafafa;
                background-image: url("/images/icon/default.png");
                background-repeat: no-repeat;
                background-size: 50% auto;
                background-position: 50% 50%;
                border-radius: 0.5rem;
                overflow: hidden;
                span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: 50% 50%;
                }
            }
            h3 {
                line-height: 1;
                font-size: 1.125rem;
                font-weight: bold;
                color: #000;
                @include text-truncate;
                margin-bottom: 0.5rem;
                padding: 0.25rem 0;
                transition: color .3s;
            }
            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                line-height: 1.5;
                font-size: 0.875rem;
                font-weight: normal;
                color: #999;
                overflow: hidden;
            }
            time {
                position: absolute;
                bottom: 1rem;
                font-size: 0.75rem;
                color: #AAA;
                &::before {
                    content: 'published @ ';
                }
            }
            &:hover {
                transform: translate3d(0, 0, 0) scale(1.03) rotate(0.1deg);
                h2 {
                    color: var(--c1);
                }
            }
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    @media only screen and (max-width: 768px) {
        margin-top: 4rem;
        li {
            a {
                min-height: 7.5rem;
                padding: 0 0 0 10rem;
                figure {
                    width: 9rem;
                    height: 7.5rem;
                }
                time {
                    bottom: 0;
                }
            }
        }
    }
    @media only screen and (max-width: 480px) {
        width: calc(100% - 2rem);
        margin-top: 2rem;
    }
    @media only screen and (max-width: 414px) {
        li {
            a {
                min-height: 4.5rem;
                padding: 0 0 0 7rem;
                figure {
                    width: 6rem;
                    height: 4.5rem;
                    border-radius: .25rem;
                }
                h3 {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    height: 2.5rem;
                    line-height: 1.25rem;
                    text-overflow: clip;
                    -ms-text-overflow: clip;
                    white-space: normal;
                    overflow: hidden;
                }
                p {
                    display: none;
                }
            }
        }
    }
}
</style>
