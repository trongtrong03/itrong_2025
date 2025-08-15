<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 0, title: '0K：楔子' },
    { id: 1, title: '1K：屯原登山口' },
    { id: 2, title: '2K：雲海保線所' },
    { id: 3, title: '3K：能高瀑布' },
    { id: 4, title: '4K：天池山莊' },
    { id: 5, title: '5K：天池' },
    { id: 6, title: '6K：奇萊南峰' },
    { id: 7, title: '7K：回程' },
    { id: 8, title: '8K：後記' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="19" fileType="mountainsLogs" />
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
        <p><span>登山日期：</span><strong>2018-10-13</strong></p>
        <p><span>行走總長：</span><strong>約 33 KM</strong></p>
        <p><span>累計耗時：</span><strong>兩天一夜</strong></p>
        <p><span>路程總覽：</span><strong>屯原登山口 → 雲海保線所 → 能高瀑布 → 天池山莊 → 天池 → 奇萊南峰</strong></p>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <div class="mtlogs-title" v-text="catalog[0].title"></div>
        <p>xxx</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <div class="mtlogs-title" v-text="catalog[1].title"></div>
        <p>本篇奇萊南峰的登山行程距今已是六年前的記錄，有些相片捕捉的當下畫面，與今日現地實景可能已有不同。</p>
        <figure>
            <img src="/images/mtlogs/019/01.jpg">
        </figure>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>