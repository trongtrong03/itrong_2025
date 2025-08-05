<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 0, title: '0K：楔子' },
    { id: 1, title: '1K：南興地磅站' },
    { id: 2, title: '2K：巴塱衛山' },
    { id: 3, title: '3K：利嘉林道' },
    { id: 4, title: '4K：後記' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="18" fileType="mountainsLogs" />
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
        <p><span>登山日期：</span><strong>2021-09-19</strong></p>
        <p><span>行走總長：</span><strong>約 0.5 KM</strong></p>
        <p><span>累計耗時：</span><strong>約 0.1 HR</strong></p>
        <p><span>路程總覽：</span><strong>南興地磅站 → 巴塱衛山 → 忘憂亭</strong></p>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <div class="mtlogs-title" v-text="catalog[0].title"></div>
        <p></p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <div class="mtlogs-title" v-text="catalog[1].title"></div>
        <p></p>
        <figure>
            <img src="/images/mtlogs/018/01.jpg">
        </figure>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>