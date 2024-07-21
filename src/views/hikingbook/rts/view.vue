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
const rtData = ref(null);

// 取得 JSON 資料
onMounted(async () => {
    const rtDataId = route.params.id;
    const dataRef = ref([]);
    await fetchData(dataRef, 'routesList', item => item.id == rtDataId);
    rtData.value = dataRef.value[0] || null;
});
</script>

<template>
    <section class="mountains-wrap">
        <div class="mountains-container">
            <div class="mountains-content" v-if="rtData">
                <div class="mountains-info">
                    <h1 v-text="rtData.name"></h1>
                    <h6 v-text="rtData.intro"></h6>
                    <figure>
                        <span :style="{ 'background-image': 'url(/images/routes/' + rtData.id + '.jpg)' }" v-if="rtData.img"></span>
                    </figure>
                    <div class="routes-list">
                        <div class="routes-item" v-for="(item, index) in 31" :key="index">
                            <div class="routes-box" v-if="rtData['p'+index+'_state']">
                                <b :class="rtData['p'+index+'_type'] == 'start' ? 'is-start' : rtData['p'+index+'_type'] == 'house' ? 'is-house' : rtData['p'+index+'_type'] == 'mountain' ? 'is-mountain' : rtData['p'+index+'_type'] == 'lake' ? 'is-lake' : rtData['p'+index+'_type'] == 'camp' ? 'is-camp' : rtData['p'+index+'_type'] == 'mark' ? 'is-mark' : rtData['p'+index+'_type'] == 'nature' ? 'is-nature' : rtData['p'+index+'_type'] == 'goal' ? 'is-goal' : ''"></b>
                                <p v-text="rtData['p'+index+'_name']"></p>
                                <span v-text="rtData['p'+index+'_tag']"></span>
                            </div>
                        </div>
                    </div>
                    <hgroup>
                        <ul>
                            <li>
                                <span>別名</span>
                                <span v-text="rtData.anotherName"></span>
                            </li>
                            <li>
                                <span>等級</span>
                                <span v-if="rtData.lv == '郊山'">郊山</span>
                                <span v-if="rtData.lv == '中級山'">中級山</span>
                                <span v-if="rtData.lv == '高山'">高山</span>
                                <span v-if="rtData.lv == '進階探勘'">進階探勘</span>
                            </li>
                            <li>
                                <span>縣市</span>
                                <span v-text="rtData.area"></span>
                            </li>
                            <li>
                                <span>山脈</span>
                                <span v-text="rtData.mts"></span>
                            </li>
                            <li>
                                <span>園區</span>
                                <span v-text="rtData.nPark"></span>
                            </li>
                            <li>
                                <span>入園</span>
                                <span v-if="rtData.application_p">是</span>
                                <span v-else>否</span>
                            </li>
                            <li>
                                <span>入山</span>
                                <span v-if="rtData.application_m">是</span>
                                <span v-else>否</span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>步道</span>
                                <span v-text="rtData.trail"></span>
                            </li>
                            <li>
                                <span>出發</span>
                                <span v-text="rtData.start"></span>
                            </li>
                            <li>
                                <span>路線</span>
                                <span v-text="rtData.route"></span>
                            </li>
                            <li>
                                <span>GPX</span>
                                <span v-if="rtData.gpx1_state">
                                    <a :href="rtData.gpx1_link" target="_blank">軌跡連結1</a>
                                </span>
                                <span v-if="rtData.gpx2_state">
                                    <a :href="rtData.gpx2_link" target="_blank">軌跡連結2</a>
                                </span>
                                <span v-if="rtData.gpx3_state">
                                    <a :href="rtData.gpx3_link" target="_blank">軌跡連結3</a>
                                </span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>里程</span>
                                <span v-if="rtData.length == '10'">10K以下</span>
                                <span v-if="rtData.length == '20'">11 ~ 20K</span>
                                <span v-if="rtData.length == '30'">21 ~ 30K</span>
                                <span v-if="rtData.length == '40'">31 ~ 40K</span>
                                <span v-if="rtData.length == '50'">41 ~ 50K</span>
                                <span v-if="rtData.length == '60'">51 ~ 60K</span>
                                <span v-if="rtData.length == '70'">61 ~ 70K</span>
                                <span v-if="rtData.length == '80'">71 ~ 80K</span>
                                <span v-if="rtData.length == '90'">81K以上</span>
                            </li>
                            <li>
                                <span>天數</span>
                                <span v-if="rtData.daytime == '1'">可當日往返</span>
                                <span v-if="rtData.daytime == '2'">至少2日</span>
                                <span v-if="rtData.daytime == '3'">至少3日</span>
                                <span v-if="rtData.daytime == '4'">至少4日</span>
                                <span v-if="rtData.daytime == '5'">至少5日</span>
                                <span v-if="rtData.daytime == '6'">6日以上</span>
                            </li>
                            <li v-if="rtData.d1_state">
                                <span>DAY1</span>
                                <span v-text="rtData.d1_route"></span>
                            </li>
                            <li v-if="rtData.d2_state">
                                <span>DAY2</span>
                                <span v-text="rtData.d2_route"></span>
                            </li>
                            <li v-if="rtData.d3_state">
                                <span>DAY3</span>
                                <span v-text="rtData.d3_route"></span>
                            </li>
                            <li v-if="rtData.d4_state">
                                <span>DAY4</span>
                                <span v-text="rtData.d4_route"></span>
                            </li>
                            <li v-if="rtData.d5_state">
                                <span>DAY5</span>
                                <span v-text="rtData.d5_route"></span>
                            </li>
                            <li v-if="rtData.d6_state">
                                <span>DAY6</span>
                                <span v-text="rtData.d6_route"></span>
                            </li>
                            <li v-if="rtData.d7_state">
                                <span>DAY7</span>
                                <span v-text="rtData.d7_route"></span>
                            </li>
                            <li v-if="rtData.d8_state">
                                <span>DAY8</span>
                                <span v-text="rtData.d8_route"></span>
                            </li>
                            <li v-if="rtData.d9_state">
                                <span>DAY9</span>
                                <span v-text="rtData.d9_route"></span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>通訊</span>
                                <span v-text="rtData.communication"></span>
                            </li>
                            <li>
                                <span>水源</span>
                                <span v-text="rtData.water"></span>
                            </li>
                            <li>
                                <span>備註</span>
                                <span v-text="rtData.notes"></span>
                            </li>
                            <li>---</li>
                            <li>
                                <span>首登</span>
                                <span v-text="rtData.fDate"></span>
                            </li>
                            <li>
                                <span>心得</span>
                                <span>
                                    <a :href="rtData.aLink" target="_blank" v-text="rtData.article"></a>
                                </span>
                            </li>
                        </ul>
                    </hgroup>
                </div>
                <div class="main-bottom">
                    <RouterLink to="/routes">返回</RouterLink>
                </div>
            </div>
            <div class="list-loading" v-else>
                <Loading />
            </div>
        </div>
    </section>
</template>