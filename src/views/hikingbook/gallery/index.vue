<script setup lang="ts">
    import { ref, computed, onBeforeMount, onMounted, onUnmounted } from "vue";
    import eventBus from "@/eventBus"; // 引入事件总线

    // 引用組件
    import Loading from "@/components/Loading.vue";

    // 引用功能
    import useNoScroll from "@/hooks/useNoScroll";
    import fetchData from "@/hooks/fetchData";

    // 載入 pinia stores
    import { useStatus } from '@/stores/status';

    // 從 store 取得 data
    const statusStore = useStatus();

    /* Gallery */
    const selectedItem = ref<any>(null);
    const currentIndex = ref<number>(0);

    // 定義資料
    const jsonData = ref<Array<any>>([]);
    const isDataLoaded = ref(false);

    // Fetch data on component mounted
    const loadData = async () => {
    await fetchData(jsonData, 'galleryList', undefined, true);
    jsonData.value = jsonData.value.map((item, index) => ({
        ...item,
        currentIndex: index,
    }));
    isDataLoaded.value = true;
    };

    onBeforeMount(loadData);

    const fetchJsonData = (item, index) => {
        currentIndex.value = index; // 设置 currentIndex 为当前数据的索引
        selectedItem.value = item; // 设置 selectedItem 为当前点击的数据项目
        statusStore.POPUP_OVERLAY = true;
        useNoScroll(true);
        eventBus.emit('fetchJsonData', item); // 触发事件总线事件
    };

    /* 動態滾動載入資料 */
    // 預設載入的資料筆數
    const defaultItemCount = 20;

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
</script>

<template>
    <section class="hikingbook-inside">
        <div class="hikingbook-block hikingbook-gallery fade-up" v-if="isDataLoaded">
            <div class="pages-title">
                <h2>影像故事</h2>
            </div>
            <ul>
                <li v-for="(item, index) in displayedItems" :key="index" @click="fetchJsonData(item, index)">
                    <figure>
                        <span :style="{ 'background-image': 'url(/images/gallery/' + item.id + '.jpg)' }"></span>
                    </figure>
                </li>
            </ul>
        </div>
        <div class="list-loading" v-else>
            <Loading />
        </div>
    </section>
</template>