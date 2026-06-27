<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '@/eventBus';
    import SvgIcons from '@/components/SvgIcons.vue';
    import useNoScroll from '@/hooks/useNoScroll';
    import fetchData from '@/hooks/fetchData';
    import { useStatus } from '@/stores/status';

    const statusStore = useStatus();
    const galleryData = ref<any[]>([]);
    const selectedItem = ref<any>(null);
    const currentIndex = ref(0);
    const imgFull = ref(false);

    async function loadData() {
        await fetchData(galleryData, 'galleryList', undefined, true);
        galleryData.value = galleryData.value.map((item, index) => ({ ...item, currentIndex: index }));
    }
    function selectItem(item: any) {
        selectedItem.value = item;
        currentIndex.value = item.currentIndex;
        statusStore.POPUP_OVERLAY = true;
        useNoScroll(true);
    }
    function loadPrevItem() {
        currentIndex.value = currentIndex.value === 0 ? galleryData.value.length - 1 : currentIndex.value - 1;
        selectedItem.value = galleryData.value[currentIndex.value];
        imgFull.value = false;
    }
    function loadNextItem() {
        currentIndex.value = currentIndex.value === galleryData.value.length - 1 ? 0 : currentIndex.value + 1;
        selectedItem.value = galleryData.value[currentIndex.value];
        imgFull.value = false;
    }
    function closePopup() {
        selectedItem.value = null;
        statusStore.POPUP_OVERLAY = false;
        imgFull.value = false;
        useNoScroll(false);
    }
    function handleExternalSelection(item: any) {
        selectedItem.value = item || null;
    }

    onMounted(() => {
        loadData();
        eventBus.on('fetchJsonData', handleExternalSelection);
        window.addEventListener('popstate', closePopup);
    });
    onUnmounted(() => {
        eventBus.off('fetchJsonData', handleExternalSelection);
        window.removeEventListener('popstate', closePopup);
        closePopup();
    });
</script>

<template>
    <ul>
        <li v-for="item in galleryData.slice(0, 8)" :key="item.id" @click="selectItem(item)">
            <figure><span :style="{ 'background-image': 'url(/images/gallery/' + item.id + '.jpg)' }"></span></figure>
        </li>
    </ul>
    <Teleport to="body">
        <div class="gallery-popup-wrap" v-if="selectedItem">
            <div class="gallery-popup-flex" :class="{ 'is-full': imgFull }">
                <div class="gallery-popup-img">
                    <figure><span :style="{ 'background-image': 'url(/images/gallery/' + selectedItem.id + '.jpg)' }"></span></figure>
                    <button class="btn-full" @click="imgFull = !imgFull"><SvgIcons name="fullscreenIcon" /></button>
                </div>
                <div class="gallery-popup-content">
                    <p v-text="selectedItem.desc"></p><p v-text="selectedItem.site"></p>
                    <div><label v-text="selectedItem.note"></label><time v-text="selectedItem.time"></time></div>
                </div>
                <div class="gallery-popup-btn">
                    <button class="btn-close" @click="closePopup"><SvgIcons name="closeIcon" /></button>
                    <button class="btn-prev" @click="loadPrevItem"></button><button class="btn-next" @click="loadNextItem"></button>
                </div>
            </div>
        </div>
        <div class="popup-overlay" v-if="statusStore.POPUP_OVERLAY"></div>
    </Teleport>
</template>

<style lang="scss" scoped>
</style>
