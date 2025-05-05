<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 0, title: '序、楔子' },
    { id: 1, title: '壹、太興岩上瑞里' },
    { id: 2, title: '貳、XXXX' },
    { id: 3, title: '參、XXXX' },
    { id: 4, title: '肆、XXXX' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="13" fileType="mountainsLogs" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li v-for="item in catalog" :key="item.id">
                <a :href="'#act' + item.id" v-text="item.title"></a>
            </li>
        </ul>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <h2 v-text="catalog[0].title"></h2>
        <p></p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>雲嘉地區的熱門登山、健走路線已完成了泰半，雖不敢自傲地說有多熟門熟路，對梅山到阿里山這帶也有一定程度的掌握──在今天之前，我原本是這樣想的，更準確地說，是更早之前更新登山清單的時候。那天我在開放街圖ＯＰＥＮＳＴＲＥＥＴＭＡＰ隨意拖拉過程中，發現梅山與阿里山兩個熱門的旅遊景點之間，夾著一處名為「瑞里」的地方，此山區範圍不大，名氣相對前面兩者也不高，地圖上卻蘊含著多條象徵行腳路跡的紅色虛線，而這一條條紅色虛線，都是一條條歷史底蘊深厚的健行步道。</p>
        <p>這些步道的前身多半由古道發展而來，山區民生物資素來匱乏，在昔時交通不便的年代，瑞里當地居民開闢數條古道，銜接阿里山森鐵設立的車站，以方便交換物資。後來公路開通，車行取代徒步，古道才逐漸失去鼎沸人聲，回歸靜謐的山林之中。直到觀光產業興起，這些古道便又再次熱鬧起來，搖身一變成為老少咸宜的踏青健行好去處。</p>
        <figure>
            <img src="/images/mtlogs/013/01.jpg">
        </figure>
        <p></p>
    </div>
    
</div> 


https://zh.wikipedia.org/zh-tw/%E7%91%9E%E9%87%8C%E6%9D%91

https://www.ali-nsa.net/zh-tw/attractions/detail/218

https://health.udn.com/health/story/6033/7488888

https://app.blog.hamibook.com.tw/%E7%BE%8E%E9%A3%9F%E6%97%85%E9%81%8A/%E7%81%AB%E8%BB%8A%E4%B8%8D%E5%88%B0%E7%9A%84%E7%A7%98%E5%A2%83%E2%94%80%E2%94%80%E7%91%9E%E9%87%8C

https://udn.com/upf/newmedia/2016_vist/10/2016101406_monntain/index.html

https://www.wenxuecity.com/blog/200905/14295/29960.html

https://tbocc.cyhg.gov.tw/Sight_Content.aspx?n=100317&s=513651
<!-- end -->
    </BaseTextContent>
</template>