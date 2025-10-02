<script setup lang="ts">
    import { ref, computed, onBeforeMount, onMounted, onUnmounted } from "vue";
    import { useRoute, useRouter } from 'vue-router';

    // 引用組件
    import Banner from "@/components/Common/Banner.vue";
    import useBodyClass from "@/hooks/useBodyClass";
    import SvgIcons from "@/components/SvgIcons.vue";
    import Loading from "@/components/Loading.vue";
    import NoResult from "@/components/NoResult.vue";

    // 引用功能
    import fetchData from "@/hooks/fetchData";

    // 傳 class name 給 body
    useBodyClass("is-resources");

    /* resources */
    // 定義資料
    const jsonData = ref<Array<any>>([]);
    const isActive = ref<number>(1);
    const filterOpen = ref<boolean>(false);
    const Filters = ref({
        title: "",
        type: "",
    });
    const isDataLoaded = ref<boolean>(false);

    // 取得 JSON 資料
    const loadData = async () => {
        await fetchData(jsonData, 'resourcesList', false, false);
        isDataLoaded.value = true;
    };

    onBeforeMount(loadData);

    // 篩選
    const setType = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        Filters.value.type = target.value;
    };

    // 預設載入的資料筆數
    const defaultItemCount = 30;

    // 追蹤目前已經載入的資料數量
    const loadedItemCount = ref<number>(defaultItemCount);

    // 計算顯示在頁面上的資料
    const displayedItems = computed(() => {
        // 先過濾資料
        const filteredData = jsonData.value.filter((b) => {
            return (
                b.title.toLowerCase().includes(Filters.value.title.toLowerCase()) &&
                (Filters.value.type === "" || b.type.some((typeVar: string) => typeVar.includes(Filters.value.type)))
            );
        });

        // 再取出前 N 筆資料
        return filteredData.slice(0, loadedItemCount.value);
    });

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
</script>

<template>
    <section class="pages-wrap">
        <Banner />
        <div class="main-center">
            <div class="main-head">
                <h1>Resources</h1>
            </div>
            <div class="list-wrap">
                <div class="list-tools">
                    <div class="list-select">
                        <SvgIcons name="downIcon" />
                        <button>
                            <SvgIcons name="filterIcon" />
                        </button>
                        <select @change="setType($event)" @click="filterOpen = false">
                            <option value="" selected>全部</option>
                            <option value="前端工具">前端工具</option>
                            <option value="前端套件">前端套件</option>
                            <option value="後端工具">後端工具</option>
                            <option value="影音圖像">影音圖像</option>
                            <option value="設計素材">設計素材</option>
                            <option value="架構規劃">架構規劃</option>
                            <option value="應用程式">應用程式</option>
                            <option value="教學資源">教學資源</option>
                            <option value="ＡＩ生成">ＡＩ生成</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                    <div class="list-input">
                        <SvgIcons name="searchIcon" />
                        <input type="text" placeholder="請輸入關鍵字" v-model="Filters.title">
                    </div>
                    <div class="list-sort">
                        <button class="btn-grid" :class="isActive==1 ? 'is-active' : ''" @click="isActive=1">
                            <SvgIcons name="gridIcon" />
                        </button>
                        <button class="btn-list" :class="isActive==2 ? 'is-active' : ''" @click="isActive=2">
                            <SvgIcons name="listIcon" />
                        </button>
                    </div>
                </div>
                <div class="pages-title">
                    <h2>推薦資源</h2>
                </div>
                <div class="list-list" :class="isActive==2 ? 'is-list' : 'is-grid'" v-if="isDataLoaded">
                    <ul>
                        <li class="list-item" v-for="(item, index) in displayedItems" :key="index">
                            <figure>
                                <span v-if="item.cover">
                                    <img src="/images/resources/default.jpg" class="background">
                                    <img :src="'/images/resources/' + item.img + '.jpg'" class="forward">
                                </span>
                                <span v-else>
                                    <img src="/images/resources/default.jpg">
                                </span>
                                <figcaption>
                                    <a :href="item.href" class="link" target="_blank">
                                        <SvgIcons name="linkIcon" />
                                    </a>
                                    <a :href="'/' + item.path" class="article" v-if="item.article">
                                        <SvgIcons name="aricleIcon" />
                                    </a>
                                </figcaption>
                            </figure>
                            <div class="list-info">
                                <h2 v-text="item.title"></h2>
                                <p v-text="item.desc"></p>
                            </div>
                        </li>
                    </ul>
                    <!-- no results -->
                    <div class="no-results" v-if="displayedItems.length === 0">
                        <NoResult />
                    </div>
                </div>
                <div class="list-loading" v-else>
                    <Loading />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
</style>