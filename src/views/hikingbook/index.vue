<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import eventBus from "@/eventBus"; // 引入事件总线

// 引用組件
import SvgIcons from "@/components/SvgIcons.vue";
import Banner from "@/components/Common/Banner.vue";

// 引用功能
import useBodyClass from "@/hooks/useBodyClass";
import useNoScroll from "@/hooks/useNoScroll";
import fetchData from "@/hooks/fetchData";

// 載入 pinia stores
import { useInfoStore } from '@/stores/datalist';
import { useStatus } from '@/stores/status';

// 從 store 取得 data
const infoStore = useInfoStore();
const statusStore = useStatus();

onMounted(() => {
    infoStore.loadHKLinks();
});

// 傳 class name 給 body
useBodyClass("is-hikingbook");

/* hikingbook */
// 定義資料
const mountainsData = ref<Array<any>>([]);
const logsData = ref<Array<any>>([]);
const linksData = ref<Array<any>>([]);
const galleryData = ref<Array<any>>([]);

// 取得 JSON 資料
const loadData = async () => {
    await fetchData(mountainsData, 'mountainsList');
    await fetchData(logsData, 'mountainsLogs');
    await fetchData(linksData, 'mountainsLinks');
    await fetchGalleryData();
};

onMounted(loadData);
onBeforeMount(loadData);

// 過濾 mountainsData 條件
const filteredMountainsData = computed(() => {
    const finishedItems = mountainsData.value.filter((item) => item.finish);
    finishedItems.sort((a, b) => new Date(b.fDate).getTime() - new Date(a.fDate).getTime());
    return finishedItems;
});

// 避免數據重新排列觸發更新導致 Uncaught (in promise) Maximum recursive updates exceeded in component
const filteredLogsData = computed(() => logsData.value.filter(item => item.status === true).slice().reverse().slice(0, 3)
);

const filteredLinksData = computed(() => linksData.value);

/* Gallery */
const selectedItem = ref<any>(null);
const currentIndex = ref<number>(0);

eventBus.on('fetchJsonData', (item) => {
    selectedItem.value = item;
    if (!item) {
        selectedItem.value = null;
    }
});

const fetchGalleryData = async () => {
    await fetchData(galleryData, 'galleryList', undefined, true);
    galleryData.value = galleryData.value.map((item, index) => ({
        ...item,
        currentIndex: index,
    }));
};

const fetchSelectedGalleryData = (item: any) => {
    selectedItem.value = item;
    currentIndex.value = item.currentIndex;
    statusStore.POPUP_OVERLAY = true;
    useNoScroll(true);
};

// 上一筆
const loadPrevItem = () => {
    currentIndex.value--;
    if (currentIndex.value < 0) {
        currentIndex.value = galleryData.value.length - 1;
    }
    selectedItem.value = galleryData.value[currentIndex.value];
    imgFull.value = false;
};

// 下一筆
const loadNextItem = () => {
    currentIndex.value++;
    if (currentIndex.value >= galleryData.value.length) {
        currentIndex.value = 0;
    }
    selectedItem.value = galleryData.value[currentIndex.value];
    imgFull.value = false;
};

// 關閉彈窗
const popupClose = () => {
    selectedItem.value = null;
    statusStore.POPUP_OVERLAY = false;
    imgFull.value = false;
    useNoScroll(false);
};

// 展開圖片
const imgFull =  ref<any>(false);
const toggleImgFull = () => {
    imgFull.value = !imgFull.value;
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

/* 進度條 */
const loadProgressBarScript = () => {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/js/progressbar.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load progressbar.js'));
        document.head.appendChild(script);
    });
};

const circleAreas = ref<Array<any>>([]);

const initCircles = () => {
    setTimeout(() => {
        const circles = [
            { selector: '#circleArea1', value: 0.14 },
            { selector: '#circleArea2', value: 0.67 }
        ];

        circles.forEach(circle => {
            const bar = new ProgressBar.Circle(circle.selector, {
                color: '#aaa',
                strokeWidth: 5,
                trailWidth: 1,
                easing: 'easeInOut',
                duration: 1400,
                text: {
                    autoStyleContainer: false
                },
                step: (state, circle) => {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
                    const value = Math.round(circle.value() * 100);
                    circle.setText(value === 0 ? '' : value.toString());
                }
            });
            bar.animate(circle.value);
            circleAreas.value.push(bar);
        });
    }, 600);
};

const delayTime = 500;
const initialized = ref<boolean>(false);

const route = useRoute();

const checkRouteAndInitCircles = async () => {
    if (route.path === '/hikingbook') {
        await loadProgressBarScript();
        setTimeout(() => {
            initCircles();
            initialized.value = true;
        }, delayTime);
    }
};

onMounted(checkRouteAndInitCircles);

watch(route, (newRoute, oldRoute) => {
    if (newRoute.path === '/hikingbook') {
        checkRouteAndInitCircles();
    }
});

onUnmounted(() => {
    circleAreas.value.forEach(bar => {
        bar.destroy();
    });
});

/* 透過路由判斷首頁的內容是否顯示 */
const isIndexRoute = computed(() => route.path === '/hikingbook');


/* 判斷特定路由以觸發subPagesHide */
// 動態產生排除的路徑模式的正規表示式
// const excludePatterns = /^\/(mtlogs|mountains|routes)\//;
const excludePatterns = /^\/[^\/]+\/[^\/]+/;
// 計算屬性，檢查是否在排除的路徑模式下
const subPagesHide = computed(() => !excludePatterns.test(route.path));


/* 日曆 */
// 定義數據類型
interface MountainEvent {
    id: string;
    fDate: string;
    name: string;
}

// 定義資料
const mountainsList = ref<MountainEvent[]>([]);
const isDataLoaded = ref<boolean>(false);

// 非同步取得資料的函數
const fetchData2 = async (dataRef: typeof mountainsList) => {
    try {
        const response = await fetch('/js/data/mountainsList.json');
        const data: MountainEvent[] = await response.json();
        // 直接將取得到的數組賦值給 dataRef
        dataRef.value = data;
        isDataLoaded.value = true;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// 取得 JSON 資料
const loadData2 = async () => {
    await fetchData2(mountainsList);
};

// 用於儲存最小和最大日期
const minDate = ref<Date>(new Date());
const maxDate = ref<Date>(new Date());

const currentYear = ref<number>(minDate.value.getFullYear());
const currentMonth = ref<number>(minDate.value.getMonth());

const showLatest = ref<boolean>(true);

// 在組件載入時呼叫 loadData2
onMounted(async () => {
    await loadData2();

    if (mountainsList.value.length > 0) {
        const dates = mountainsList.value.filter((event) => event.fDate).map((event) => new Date(event.fDate));

        if (dates.length > 0) {
            minDate.value = new Date(Math.min(...dates));
            maxDate.value = new Date(Math.max(...dates));
            
            // 根據 showLatest 的值來設定 currentYear 和 currentMonth
            if (showLatest.value) {
                currentYear.value = maxDate.value.getFullYear();
                currentMonth.value = maxDate.value.getMonth();
            } else {
                currentYear.value = minDate.value.getFullYear();
                currentMonth.value = minDate.value.getMonth();
            }
        }
    }
});

// 計算當月的所有天數
const daysInMonth = computed(() => {
    if (!isDataLoaded.value) return [];

    const date = new Date(currentYear.value, currentMonth.value, 1);
    const days: { date: Date; events: MountainEvent[] }[] = [];

    while (date.getMonth() === currentMonth.value) {
        // 找到所有與當前日期相符的事件
        const dayEvents = mountainsList.value.filter((event) => {
            if (!event.fDate) return false;    // 確保有 fDate 才進行比較
            const eventDate = new Date(event.fDate);
            return (
                eventDate.getFullYear() === currentYear.value &&
                eventDate.getMonth() === currentMonth.value &&
                eventDate.getDate() === date.getDate()
            );
        });

        days.push({ date: new Date(date), events: dayEvents });
        date.setDate(date.getDate() + 1);
    }

    return days;
});

// 統計每月數量
const eventsCountInMonth = computed(() => {
    return daysInMonth.value.reduce((count, day) => {
        return count + day.events.length;
    }, 0);
});

// 切換到上一個月
function prevMonth(): void {
    if (currentMonth.value === 0) {
        currentYear.value--;
        currentMonth.value = 11;
    } else {
        currentMonth.value--;
    }

    if (
        currentYear.value < minDate.value.getFullYear() || (currentYear.value === minDate.value.getFullYear() && currentMonth.value < minDate.value.getMonth())
    ) {
        currentYear.value = minDate.value.getFullYear();
        currentMonth.value = minDate.value.getMonth();
    }
}

// 切換到下一個月
function nextMonth(): void {
    if (currentMonth.value === 11) {
        currentYear.value++;
        currentMonth.value = 0;
    } else {
        currentMonth.value++;
    }

    if (
        currentYear.value > maxDate.value.getFullYear() || (currentYear.value === maxDate.value.getFullYear() && currentMonth.value > maxDate.value.getMonth())
    ) {
        currentYear.value = maxDate.value.getFullYear();
        currentMonth.value = maxDate.value.getMonth();
    }
}

// 判斷 Prev & Next 按鈕是否禁用
const isPrevDisabled = computed<boolean>(() => {
    return (
        currentYear.value === minDate.value.getFullYear() &&
        currentMonth.value === minDate.value.getMonth()
    );
});

const isNextDisabled = computed<boolean>(() => {
    return (
        currentYear.value === maxDate.value.getFullYear() &&
        currentMonth.value === maxDate.value.getMonth()
    );
});

// 新舊排序
const toggleDateOrder = (): void => {
    showLatest.value = !showLatest.value;

    // 切換 currentYear 和 currentMonth 到對應的日期
    if (showLatest.value) {
        currentYear.value = maxDate.value.getFullYear();
        currentMonth.value = maxDate.value.getMonth();
    } else {
        currentYear.value = minDate.value.getFullYear();
        currentMonth.value = minDate.value.getMonth();
    }
};
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
                            <div class="hikingbook-progress">
                                <h2>進度</h2>
                                <ul>
                                    <li>
                                        <div id="circleArea1" class="progress-circle"></div>
                                        <h3>百岳</h3>
                                    </li>
                                    <li>
                                        <div id="circleArea2" class="progress-circle"></div>
                                        <h3>小百岳</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="hikingbook-f2">
                            <div>
                                <h2>近期完成山岳</h2>
                                <div class="hikingbook-lastest-list">
                                    <ul>
                                        <li v-for="item in filteredMountainsData.slice(0, 6)" :key="item.id">
                                            <RouterLink :to="'/mountains/' + item.id">
                                                <figure>
                                                    <img :src="'/images/mountains/thumb/' + item.id + '.jpg'" v-if="item.img">
                                                    <img src="/images/mountains/thumb/default.jpg" v-else>
                                                </figure>
                                                <hgroup>
                                                    <h3 v-text="item.name"></h3>
                                                    <!-- <h4 v-text="item.county"></h4> -->
                                                    <h5 v-text="item.height + 'm'"></h5>
                                                    <time v-text="item.fDate"></time>
                                                </hgroup>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h2>近期發表文章</h2>
                                <div class="hikingbook-lastest-article">
                                    <ul>
                                        <li v-for="item in filteredLogsData" :key="item.id">
                                            <RouterLink :to="'/mtlogs/' + item.id">
                                                <figure>
                                                    <span :style="{ 'background-image': 'url(/images/mtlogs/' + item.id + '/cover.jpg)' }"></span>
                                                </figure>
                                                <hgroup>
                                                    <time v-text="item.time"></time>
                                                    <p v-text="item.title"></p>
                                                </hgroup>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hikingbook-block hikingbook-gallery">
                        <h2>影像故事</h2>
                        <ul>
                            <li v-for="(item, index) in galleryData.slice(0, 8)" :key="index" @click="fetchSelectedGalleryData(item, index)">
                                <figure>
                                    <span :style="{ 'background-image': 'url(/images/gallery/' + item.id + '.jpg)' }"></span>
                                </figure>
                            </li>
                        </ul>
                    </div>
                    <div class="hikingbook-block hikingbook-link">
                        <h2>相關資源</h2>
                        <ul>
                            <li v-for="(item, index) in filteredLinksData" :key="index">
                                <figure>
                                    <img :src="'/images/resources/hiking/' + item.img + '.jpg'" v-if="item.cover">
                                    <img src="/images/resources/default.jpg" v-else>
                                    <figcaption>
                                        <a :href="item.href" class="link" target="_blank">
                                            <SvgIcons name="linkIcon" />
                                        </a>
                                    </figcaption>
                                </figure>
                                <hgroup>
                                    <h2 v-text="item.title"></h2>
                                </hgroup>
                            </li>
                        </ul>
                    </div>
                    <div class="hikingbook-block hikingbook-calendar">
                        <h2>里程碑</h2>
                        <div class="calendar-wrap">
                            <div class="calendar-head">
                                <div class="calendar-info">
                                    <span>{{ currentYear }} 年 {{ currentMonth + 1 }} 月</span>
                                    <!-- <span v-if="isDataLoaded">（{{ eventsCountInMonth }}）</span> -->
                                </div>
                                <div class="calendar-tool">
                                    <button class="btn-sort" @click="toggleDateOrder">
                                        <SvgIcons :name="showLatest ? 'sortDownIcon' : 'sortUpIcon'" />
                                    </button>
                                    <button class="btn-prev" @click="prevMonth" :disabled="isPrevDisabled">
                                        <SvgIcons name="leftIcon" />
                                    </button>
                                    <button class="btn-next" @click="nextMonth" :disabled="isNextDisabled">
                                        <SvgIcons name="rightIcon" />
                                    </button>
                                </div>
                            </div>
                            <div v-if="isDataLoaded" class="calendar-list">
                                <div v-for="day in daysInMonth" :key="day.date" class="calendar-item">
                                    <strong>{{ day.date.getDate() }}</strong>
                                    <ul v-if="day.events.length > 0" class="calendar-box">
                                        <li v-for="item in day.events" :key="item.id">
                                            <RouterLink :to="'/mountains/' + item.id">
                                                <figure>
                                                    <!-- <img :src="'/images/mountains/thumb/' + item.id + '.jpg'" v-if="item.img">
                                                    <img src="/images/mountains/thumb/default.jpg" v-else> -->
                                                    <figcaption v-text="item.name"></figcaption>
                                                </figure>
                                            </RouterLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>Loading data...</div>
                        </div>
                    </div>
                </div>
                <RouterView/>
            </div>
        </div>
    </section>
    <!-- popup -->
    <div class="gallery-popup-wrap" v-if="selectedItem">
        <div class="gallery-popup-flex" :class="imgFull == true ? 'is-full' : ''">
            <div class="gallery-popup-img">
                <figure>
                    <span :style="{ 'background-image': 'url(/images/gallery/' + selectedItem.id + '.jpg)'}"></span>
                </figure>
                <button class="btn-full" @click="toggleImgFull">
                    <SvgIcons name="fullscreenIcon" />
                </button>
            </div>
            <div class="gallery-popup-content">
                <p v-text="selectedItem.desc"></p>
                <p v-text="selectedItem.site"></p>
                <div>
                    <label v-text="selectedItem.note"></label>
                    <time v-text="selectedItem.time"></time>
                </div>
            </div>
            <div class="gallery-popup-btn">
                <button class="btn-close" @click="popupClose">
                    <SvgIcons name="closeIcon" />
                </button>
                <button class="btn-prev" @click="loadPrevItem"></button>
                <button class="btn-next" @click="loadNextItem"></button>
            </div>
        </div>
    </div>
    <div class="popup-overlay" v-if="statusStore.POPUP_OVERLAY == true"></div>
</template>

<style lang="scss" scoped>
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
            width: 100%;
            height: 2.5rem;
            font-size: 1em;
            color: var(--black);
            background-color: #fff;
            border-radius: 0.5rem;
            transition: all .3s;
            svg {
                width: 1.125rem;
                fill: var(--black);
            }
            span {
                margin-left: .5rem;
            }
            &:hover,
            &.router-link-active {
                background-color: var(--c1);
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

// progress circle
.hikingbook-progress {
    ul {
        text-align: center;
        padding-top: 1rem;
    }
    li {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        list-style-type: none;
        margin: 0 auto;
        padding: 1rem 0;
        h3 {
            display: block;
            width: 100%;
            text-align: center;
            font-size: .875em;
            color: #666;
            margin-top: 0.5rem;
        }
    }
    @media only screen and (max-width: 768px) {
        li {
            margin: 0 1.5rem;
        }
    }
    @media only screen and (max-width: 414px) {
        ul {
            display: flex;
        }
        li {
            flex: 1;
            min-width: 0;
            margin: 0;
        }
    }
}

:deep(.progress-circle) {
    position: relative;
    width: 8rem;
    height: 8rem;
    margin: 0 auto;
    &::before {
        content: '--';
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 0;
        font-size: 2rem;
        color: #bbb;
        transform: translate(-50%, -50%);
    }
    svg {
        path {
            &:nth-child(1) {
                fill: #FAFAFA;
                fill-opacity: 1;
                stroke: #FEFEFE !important;
            }
            &:nth-child(2) {
                stroke-width: 4 !important;
                stroke: var(--c1) !important;
                stroke-linecap: round;
            }
        }
    }
    @media only screen and (max-width: 414px) {
        width: 7rem;
        height: 7rem;
    }
}

:deep(.progressbar-text) {
    position: relative;
    font-size: 2.5em;
    font-weight: bold;
    color: var(--black) !important;
    background-color: #f7f7f7;
    &::after {
        content: '%';
        position: absolute;
        bottom: -1rem;
        left: 0;
        display: block;
        width: 100%;
        text-align: center;
        font-size: 0.5em;
        font-weight: normal;
        animation-name: fadeIn;
        animation-direction: .5s;
        animation-delay: .5s;
        animation-fill-mode: both;
    }
    @media only screen and (max-width: 414px) {
        font-size: 2em;
    }
}

// list
.hikingbook-lastest-list {
    padding-top: 1rem;
    ul {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-column-gap: 1rem;
    }
    li {
        flex: 1;
        min-width: 0;
        list-style-type: none;
        a {
            display: block;
            figure {
                position: relative;
                border-radius: 0.5rem;
                margin-bottom: 0.25rem;
                overflow: hidden;
                &::after {
                    content: '...';
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    align-content: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    color: var(--c1);
                    background-color: rgba(#000, .7);
                    opacity: 0;
                    transition: opacity .3s;
                }
                img {
                    display: block;
                    max-width: 100%;
                    transform: translate3d(0, 0, 0) scale(1) rotate(0.1deg);
                    transition: all .3s;
                }
            }
            hgroup {
                line-height: 1.4;
                text-align: center;
                h3 {
                    display: block;
                    line-height: 2;
                    font-size: .813em;
                    color: var(--black);
                    @include text-truncate;
                }
                h4 {
                    display: block;
                    font-size: 0.75em;
                    color: #999;
                    @include text-truncate;
                }
                h5 {
                    display: block;
                    font-size: 0.675em;
                    color: #999;
                    @include text-truncate;
                    &::before {
                        content: '▲';
                        color: var(--red);
                    }
                }
                time {
                    display: block;
                    font-size: 0.675em;
                    color: #BBB;
                    @include text-truncate;
                }
            }
            &:hover {
                figure {
                    &::after {
                        opacity: 1;
                    }
                    img {
                        transform: translate3d(0, 0, 0) scale(1.1) rotate(0.1deg);
                    }
                }
            }
        }
        
        &:last-child {
            margin-right: 0;
        }
    }
    @media only screen and (max-width: 960px) {
        ul {
            grid-template-columns: repeat(5, 1fr);
        }
        li {
            &:last-child {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 480px) {
        ul {
            grid-template-columns: repeat(4, 1fr);
        }
        li {
            &:nth-child(5) {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 414px) {
        ul {
            grid-template-columns: repeat(3, 1fr);
        }
        li {
            &:nth-child(4) {
                display: none;
            }
        }
    }
}

.hikingbook-lastest-article {
    padding-top: 1rem;
    li {
        list-style-type: none;
        margin-bottom: 0.5rem;
        a {
            position: relative;
            display: flex;
            align-items: center;
            align-content: center;
            figure {
                flex: 0 0 3rem;
                min-width: 0;
                height: 3rem;
                border-radius: .5rem;
                overflow: hidden;
                span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-repeat: no-repeat;
                }
            }
            hgroup {
                flex: 1;
                min-width: 0;
                margin-left: 1rem;
                time {
                    font-size: 0.75em;
                    color: #999;
                    @include text-truncate;
                }
                p {
                    line-height: 2;
                    font-size: 1em;
                    color: var(--black);
                    @include text-truncate;
                    transition: color .3s;
                }
            }
            &:hover {
                hgroup {
                    p {
                        color: var(--c1);
                    }
                }
            }
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    @media only screen and (max-width: 480px) {
        li {
            a {
                hgroup {
                    p {
                        font-size: 0.875em;
                    }
                }
            }
        }
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
                font-size: 0.875em;
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

.calendar-wrap {
    position: relative;    
}

.calendar-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--c1);
    border-radius: .5rem .5rem 0 0;
    margin-bottom: 1rem;
    padding: .5rem 1rem;
}

.calendar-info {
    color: #FFF;
    span {
        font-weight: bold;
    }
}

.calendar-tool {
    flex: 0 0 auto;
    min-width: 0;
    button {
        display: inline-block;
        vertical-align: middle;
        width: 2.5rem;
        height: 2.5rem;
        background-color: #FFF;
        border-radius: 0.5rem;
        margin-left: 0.25rem;
        svg {
            width: .8rem;
            fill: var(--black);
        }
        &:disabled {
            opacity: 0.2;
        }
    }
}

.calendar-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
}

.calendar-item {
    min-height: 4rem;
    text-align: center;
    border: 1px solid #DDD;
    border-radius: 0.5rem;
    padding: 10px;
    strong {
        display: block;
        font-weight: bold;
    }
}

.calendar-box {
    margin-top: .5rem;
    
    li {
        margin-bottom: 0.5rem;
        &:last-child {
            margin-bottom: 0;
        }
        figure {
            display: flex;
            align-items: center;
            img {
                width: 2.5rem;
                border-radius: 0.5rem;
            }
        }
        figcaption {
            flex: 1;
            text-align: center;
            font-size: 0.75rem;
            color: var(--black);
            transition: all .3s;
        }
        &:hover {
            figcaption {
                color: var(--c1);
            }
        }
    }
}
</style>