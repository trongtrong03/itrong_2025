<script setup>
    import { ref, computed, onMounted } from 'vue';
    import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
    import 'leaflet/dist/leaflet.css';

    const tagFilter = ref('all');
    const finishFilter = ref('all');
    const activeItemId = ref('');
    const mapObject = ref(null);
    const markerMap = new Map();
    const LIST = ref([]);
    const tagFilters = ['百岳', '小百岳', '百步道'];

    const isValidCoordinateValue = (value) => {
        return value !== '' && value !== null && value !== undefined;
    };

    const isValidCoordinate = (lat, lng) => {
        if (!isValidCoordinateValue(lat) || !isValidCoordinateValue(lng)) return false;

        const latNumber = Number(lat);
        const lngNumber = Number(lng);

        return Number.isFinite(latNumber) && Number.isFinite(lngNumber);
    };

    const normalizeOsmItem = (item) => ({
        ...item,
        lat: Number(item.lat),
        lng: Number(item.lng),
    });

    // 依 id 建立 OSM 座標對照，避免同名山岳互相覆蓋。
    const createOsmCoordinateMap = (osmList) => {
        return new Map(
            osmList
                .filter(item => item.id && item.match === true && isValidCoordinate(item.lat, item.lng))
                .map(item => [String(item.id), normalizeOsmItem(item)])
        );
    };

    // 地圖定位只使用 OSM 快取座標；沒有命中的資料不渲染 marker。
    const resolveLocation = (item, osmCoordinateMap) => {
        return osmCoordinateMap.get(String(item.id)) ?? null;
    };

    const loadData = async () => {
        try {
            const [mountainsResponse, osmResponse] = await Promise.all([
                fetch('/js/data/mountainsList.json'),
                fetch('/js/data/mountainsListOSM.json'),
            ]);

            if (!mountainsResponse.ok) throw new Error('無法載入 mountainsList.json');
            if (!osmResponse.ok) throw new Error('無法載入 osmMountainsList.json');

            const mountainsList = await mountainsResponse.json();
            const osmList = await osmResponse.json();
            const osmCoordinateMap = createOsmCoordinateMap(osmList);

            LIST.value = mountainsList
                .map(item => {
                    const location = resolveLocation(item, osmCoordinateMap);

                    return {
                        ...item,
                        mapLat: location?.lat ?? null,
                        mapLng: location?.lng ?? null,
                        osmName: location?.osmName ?? '',
                        osmDisplayName: location?.displayName ?? '',
                        osmType: location?.osmType ?? '',
                        osmId: location?.osmId ?? '',
                    };
                })
                .filter(item => isValidCoordinate(item.mapLat, item.mapLng));
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(loadData);

    const filteredList = computed(() => {
        let list = LIST.value;

        if (tagFilters.includes(tagFilter.value)) {
            list = list.filter(item => item.tags?.includes(tagFilter.value));
        }

        if (finishFilter.value !== 'all') {
            list = list.filter(item => item.finish === finishFilter.value);
        }

        return list;
    });

    const resetFilters = () => {
        tagFilter.value = 'all';
        finishFilter.value = 'all';
    };

    const setMapObject = (map) => {
        mapObject.value = map;
    };

    const registerMarker = (id, marker) => {
        markerMap.set(String(id), marker);
    };

    const selectMapItem = (item) => {
        activeItemId.value = String(item.id);

        const latLng = [item.mapLat, item.mapLng];
        const currentZoom = mapObject.value?.getZoom?.() ?? 8;
        mapObject.value?.setView?.(latLng, Math.max(currentZoom, 12));
        markerMap.get(String(item.id))?.openPopup?.();
    };
</script>

<template>
    <section class="hikingbook-inside">
        <div class="hikingbook-block fade-up">
            <div class="pages-title">
                <h2>名山地圖</h2>
            </div>
            <div class="map-wrap">
                <div class="map-head">
                    <div class="map-filter">
                        <ul>
                            <li>
                                <button @click="resetFilters" :class="{ 'is-active': tagFilter === 'all' && finishFilter === 'all' }">全部</button>
                            </li>
                            <li>
                                <button @click="finishFilter = false" :class="{ 'is-active': finishFilter === false }">未完成</button>
                            </li>
                            <li>
                                <button @click="finishFilter = true" :class="{ 'is-active': finishFilter === true }">已完成</button>
                            </li>
                        </ul>
                    </div>
                    <div class="map-filter">
                        <ul>
                            <li>
                                <button @click="tagFilter = '百岳'" :class="{ 'is-active': tagFilter === '百岳' }">百岳</button>
                            </li>
                            <li>
                                <button @click="tagFilter = '小百岳'" :class="{ 'is-active': tagFilter === '小百岳' }">小百岳</button>
                            </li>
                            <li>
                                <button @click="tagFilter = '百步道'" :class="{ 'is-active': tagFilter === '百步道' }">百步道</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="map-main">
                    <div class="map-list">
                        <button
                            v-for="item in filteredList"
                            :key="`list-${item.id}`"
                            type="button"
                            class="map-item"
                            :class="{ 'is-active': activeItemId === String(item.id) }"
                            @click="selectMapItem(item)"
                        >
                            <figure>
                                <img :src="'/images/mountains/thumb/' + item.id + '.jpg'" v-if="item.img">
                                <img src="/images/mountains/default.png" v-else>
                            </figure>
                            <hgroup>
                                <h2>{{ item.name }}</h2>
                                <h3><span>{{ item.height }}m</span></h3>
                            </hgroup>
                        </button>
                    </div>
                    <div class="map-content">
                        <l-map
                            style="height: 100%"
                            :zoom="8"
                            :center="[23.8, 121]"
                            :use-global-leaflet="false"
                            @ready="setMapObject"
                        >
                            <l-tile-layer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
            
                            <l-marker
                                v-for="item in filteredList"
                                :key="item.id"
                                :lat-lng="[item.mapLat, item.mapLng]"
                                @ready="registerMarker(item.id, $event)"
                                @click="activeItemId = String(item.id)"
                            >
                                <l-popup>
                                    <strong>{{ item.name }}</strong>
                                    <span>頭銜：{{ item.tags?.join('、') }}</span>
                                    <span>縣市：{{ item.county }}</span>
                                    <span>海拔：{{ item.height }}m</span>
                                    <span>狀態：{{ item.finish === true ? '已完成' : '未完成' }}</span>
                                </l-popup>
                            </l-marker>
                        </l-map>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .map-head {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .map-filter {
        position: relative;
        padding-right: 1rem;
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            z-index: 0;
            display: block;
            width: 1px;
            height: 50%;
            background: var(--c2);
            transform: translateY(-50%);
        }
        ul {
            display: flex;
            gap: .5rem;
        }
        button {
            min-width: 64px;
            height: 2rem;
            font-size: 0.875rem;
            background-color: #f9f9f9;
            border-radius: 99px;
            padding: 0 2rem;
            &.is-active {
                color: #FFF;
                background: var(--c2);
            }
        }
        &:last-child {
            padding-right: 0;
            &::after {
                display: none;
            }
        }
        @media only screen and (max-width: 960px) {
            button {
                padding: 0 1rem;
            }
        }
    }

    .map-main {
        display: flex;
        gap: .5rem;
        height: 800px;
    }

    .map-list {
        flex: 0 0 15rem;
        min-width: 0;
        overflow-y: auto;
        @media only screen and (max-width: 960px) {
            display: none;
        }
    }

    .map-item {
        display: flex;
        align-items: flex-start;
        gap: .5rem;
        width: 100%;
        background: #F7F7F7;
        border-radius: .5rem;
        border: 0;
        margin-bottom: 2px;
        padding: .75rem .5rem;
        cursor: pointer;
        figure {
            flex: 0 0 2.5rem;
            width: 2.5rem;
            aspect-ratio: 1 / 1;
            background: #EEE;
            border-radius: 0.5rem;
            overflow: hidden;
            img {
                display: block;
                width: 100%;
            }
        }
        hgroup {
            flex: 1;
            min-width: 0;
            text-align: left;
            h2 {
                font-size: .875rem;
                padding: 0.25rem 0;
            }
            h3 {
                display: flex;
                gap: .25rem;
                font-size: 0.75rem;
                color: #999;
                span {
                    display: flex;
                    align-items: center;
                    gap: .25rem;
                    &::before {
                        content: '▲';
                        font-size: 0.625rem;
                        color: var(--red);
                    }
                }
            }
        }
        &.is-active,
        &:hover {
            background: #DDD;
        }
    }

    .map-content {
        flex: 1;
        border-radius: .5rem;
        overflow: hidden;
    }

    :deep() {
        .leaflet-popup-content {
            strong {
                display: block;
                font-size: 1rem;
                margin-bottom: 0.25rem;
            }
            span {
                display: block;
            }
        }
    }
</style>
