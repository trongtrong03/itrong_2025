<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 0, title: '0K：楔子' },
    { id: 1, title: '1K：孚佑宮' },
    { id: 2, title: '2K：石蟾蜍' },
    { id: 3, title: '3K：崁頭山' },
    { id: 4, title: '4K：後記' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="17" fileType="mountainsLogs" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li v-for="item in catalog" :key="item.id">
                <a :href="'#act' + item.id" v-text="item.title"></a>
            </li>
        </ul>
    </div>
    <div class="text-info">
        <p><span>登山日期：</span><strong>2021-10-30</strong></p>
        <p><span>行走總長：</span><strong>約 5 KM</strong></p>
        <p><span>累計耗時：</span><strong>約 2 HR</strong></p>
        <p><span>路程總覽：</span><strong>龍崀頂步道 → 火炎山 → 彌陀寺 → 三灣老街</strong></p>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <div class="mtlogs-title" v-text="catalog[0].title"></div>
        <p>峎，漢語辭典記載其發音同為三聲「恩」字音，而在客家話中則念作「跟」，此字有著山頂的含義。雖然字義與山有關，但是放眼中華文化圈，鮮少有以此字做為地理名稱，甚至現代字典參考的鼻祖之一──《玉篇》，也只是簡短地記述峎為山名爾爾，資訊極少。不過在台灣苗栗縣三灣鄉的內灣村，仍存在著這麼一個古老地名，名喚「龍崀頂」，它所處位置為內灣村當地人視為龍脈的制高點，故而得名。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <div class="mtlogs-title" v-text="catalog[1].title"></div>
        <p></p>
        <figure>
            <img src="/images/mtlogs/017/01.jpg">
        </figure>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>