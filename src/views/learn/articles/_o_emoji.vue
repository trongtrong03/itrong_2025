<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";
import PrismHighlight from '@/components/Common/PrismHighlight.vue';

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 1, title: '一、什麼是 Emoji？' },
    { id: 2, title: '二、Emoji 的類型' },
    { id: 3, title: '三、' },
    { id: 4, title: '四、' },
    { id: 5, title: '五、參考資料' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="80" fileType="learnList" />
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
        <p>Emoji，是一種以小型圖像或符號形式表達情感、概念和物品的交流工具。它們最早由日本的 Shigetaka Kurita 在 1990 年代後期創作，用於 NTT DoCoMo 的移動互聯網平台。如今，Emoji 已成為全球通用的數字溝通工具，被廣泛使用於短信、社交媒體、電子郵件等各種在線平台。Emoji 在日常交流中扮演著重要角色，幫助用戶更加生動地表達情感和意圖。</p>
        <p><br></p>
        <h3>Emoji 的發展歷程：</h3>
        <p>早期的 Emoji 僅限於日本的移動通訊平台。隨著智能手機的普及，Emoji 被更多人接觸和使用。Unicode Consortium 的介入使得 Emoji 得以標準化，保證了它們在不同設備和操作系統上的一致顯示。如今，蘋果、谷歌、微軟等公司都擁有自己的 Emoji 設計，但所有的 Emoji 都遵循統一的 Unicode 標準。</p>
        <p><br></p>
        <h3>Emoji 的文化影響：</h3>
        <p>Emoji 在數字交流中扮演著重要角色，幫助人們在文字中更好地表達情感和語氣。它們還促進了跨文化溝通，成為全球通用的交流工具。在社交媒體和品牌營銷中，Emoji 被廣泛應用來吸引用戶和傳達信息。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>Emoji 的範圍廣泛，包括但不限於以下幾類：</p>
        <ul>
            <li>臉部表情和人物</li>
            <li>動物和自然</li>
            <li>食物和飲料</li>
            <li>活動和事件</li>
            <li>物品和符號</li>
        </ul>
        <p>接下來將列舉各個類型常見的 Emoji 符號有哪些：</p>

    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
    </div>
    
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <dl>
            <dd><a href="https://emoji6.com/emojiall/" target="_blank">Emoji大全</a></dd>
            <dd><a href="https://tw.piliapp.com/emoji/list/" target="_blank">Emoji列表</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>