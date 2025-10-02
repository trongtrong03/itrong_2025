<script setup lang="ts">
    import axios from 'axios';
    import { ref, onMounted, watch } from "vue";
    import { useRoute } from 'vue-router';

    // 引用組件
    import SvgIcons from "@/components/SvgIcons.vue";
    import Loading from "@/components/Loading.vue";

    // 引用功能
    import fetchData from "@/hooks/fetchData";

    // 定義資料
    const route = useRoute();
    const mtData = ref(null);

    // 取得 JSON 資料
    onMounted(async () => {
        const mtDataId = route.params.id;
        const dataRef = ref([]);
        await fetchData(dataRef, 'mountainsList', item => item.id == mtDataId);
        mtData.value = dataRef.value[0] || null;
    });
</script>

<template>
    <section class="mountains-wrap">
        <div class="mountains-container">
            <div class="mountains-content" v-if="mtData">
                <div class="mountains-info">
                    <h1 v-text="mtData.name"></h1>
                    <h6 v-text="mtData.intro"></h6>
                    <figure>
                        <span :style="{ 'background-image': 'url(/images/mountains/' + mtData.id + '.jpg)' }" v-if="mtData.img"></span>
                    </figure>
                    <hgroup>
                        <ul>
                            <li>
                                <span>別名</span>
                                <span v-text="mtData.anotherName"></span>
                            </li>
                            <li>
                                <span>高度</span>
                                <span v-text="mtData.height + 'm'"></span>
                            </li>
                            <li>
                                <span>縣市</span>
                                <span v-text="mtData.county + ' ' + mtData.town"></span>
                            </li>
                            <li>
                                <span>頭銜</span>
                                <span v-text="mtData.title"></span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>等級</span>
                                <span v-text="mtData.lv"></span>
                            </li>
                            <li>
                                <span>山系</span>
                                <span v-text="mtData.mts"></span>
                            </li>
                            <li>
                                <span>園區</span>
                                <span v-text="mtData.nPark"></span>
                            </li>
                            <li>
                                <span>入園</span>
                                <span v-if="mtData.application_p">是</span>
                                <span v-else>否</span>
                            </li>
                            <li>
                                <span>入山</span>
                                <span v-if="mtData.application_m">是</span>
                                <span v-else>否</span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>步道</span>
                                <span v-text="mtData.trail"></span>
                            </li>
                            <li>
                                <span>起登</span>
                                <span v-text="mtData.start"></span>
                            </li>
                            <li>
                                <span>路線</span>
                                <span v-text="mtData.route"></span>
                            </li>
                            <li>
                                <span>里程</span>
                                <span v-text="'約 ' + mtData.distance + ' K'"></span>
                            </li>
                            <li>
                                <span>天數</span>
                                <span v-text="mtData.day"></span>
                            </li>
                            <li>
                                <span>GPX</span>
                                <span>
                                    <a :href="mtData.gpx" target="_blank">軌跡連結</a>
                                </span>
                            </li>
                            <li>
                                <span>備註</span>
                                <span v-text="mtData.notes"></span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>首登</span>
                                <span v-text="mtData.fDate"></span>
                            </li>
                            <li>
                                <span>心得</span>
                                <span>
                                    <a class="article" :href="mtData.aLink" target="_blank" v-text="mtData.article"></a>
                                </span>
                            </li>
                        </ul>
                    </hgroup>
                </div>
                <div class="main-bottom">
                    <RouterLink to="/mountains">返回</RouterLink>
                </div>
            </div>
            <div class="list-loading" v-else>
                <Loading />
            </div>
        </div>
    </section>
</template>