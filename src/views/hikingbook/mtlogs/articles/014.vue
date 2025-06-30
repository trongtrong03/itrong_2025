<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 0, title: '序、楔子' },
    { id: 1, title: '壹、古寺靈洞揚梵唱' },
    { id: 2, title: '貳、道上斜陽林間照' },
    { id: 3, title: '參、仙境仙水伴雲飄' },
    { id: 4, title: '肆、山中山人樂逍遙' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="14" fileType="mountainsLogs" />
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
        <p>xxxxxxxxxxxx</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>馳騁台三線上途經苗栗獅潭鄉，一座巍峨巨大的牌樓就矗立在浪漫台三線與１２４縣道的岔路口，牌樓橫匾上提著四個大字：「仙山聖門」，兩側又分別提寫上靈洞宮與協靈宮。說起這座位於獅潭與南庄交界處的靈洞宮，其實對我們來說並不陌生──早在一年半載之前挑戰苗栗縣山「加里山」之時，我們就曾經短暫在這裡停留休息一陣子過。然而當時初入登山界，對於岳界名山的認識都還處於九牛一毛階段，並不曉得靈洞宮就座落於同為小百岳一員的「仙山」山腰處。</p>
        <p>倘若當時就知道仙山，還知道從靈洞宮起登到仙山山頂僅八百公尺的距離，那麼我就會抓緊暈車的友人在車上歇息的空檔，速速打卡這座小百岳。然而遺憾的是，那位才剛進入山道就暈車、十分不爭氣的友人竟是我自己。當時暈的厲害，只依稀記得自己短暫下車上個廁所後，就回到車上躺著休息好久，也沒心思好好參觀這座香火鼎盛的廟宇，直待到暈眩感逐漸消彌才又繼續驅車前往加里山。所以即使時光重來，我也無法如願一天內同時收穫兩座小百岳，不過這也無傷大雅，畢竟山一直都在。</p>
        <figure>
            <img src="/images/mtlogs/014/01.jpg">
        </figure>
        <p>在廟宇密度名列世界前茅的台灣地區來說，靈洞宮的歷史淵源並不算深遠。根據廟方敘述，靈洞宮的興建年份約落在民國三十年前後，那時還是由日本人治理台灣的年代。據說之所以會開建靈洞宮，乃是當時「紅毛館」該地有戶蕭姓人家，全家因長年深受疾病侵襲而痛苦不已。驀地，某日夜寢時得到神仙啟示，神明告訴他們在當地的山嶺上有一座仙泉可以治百病，一家人半信半疑下前往嘗試，不料想竟果真病除痊癒，同時伴隨著求泉過程中遭遇的種種仙跡顯現，蕭家人便對神蹟深信且感念不已。</p>
        <p>後來蕭家因一泉治病的事蹟一傳十、十傳百，仙水盛名傳頌全台，各地前來朝聖求水的善男信女源源不絕，相傳甚至驚動了日本當地官員，官員對於仙水治病、泥巴療傷等傳說十分不以為然，認為這些只是流傳於民間的迷信謠言，遂決定帶隊上山封堵仙泉。沒想到一行人在半途中便感到身體不適、腹痛如絞，只得退回山下治病，然而用盡各種藥方，日本官員們的病狀依然無法改善，萬般無奈下只好聽從當地居民的建議，飲用當初治癒蕭家人的那口仙泉。</p>
        <figure>
            <img src="/images/mtlogs/014/02.jpg">
        </figure>
        <p>至於結果如何應該也可想而知了，奇蹟般痊癒的日本官員們在那之後便打消閉堵仙泉的念頭，這件事更讓仙泉再增添一筆神蹟，這座湧泉既被稱為仙泉，那麼其所在的這座原名為「紅毛館山」的山岳，理所當然亦被改喚為「仙山」，並先後建成靈洞宮、協靈宮，原先仙水湧現的位置則砌起仙水亭，提供各路信徒炷香祭拜，凡任何前來朝聖仙山的善男信女，求神問事同時，也無不渴望飲上一口滋味清甜的仙水。</p>
        <p>民國六、七十年代，休閒觀光產業逐漸興起，其中也包含登山活動，各地紛紛開始或推廣、或開闢登山健行步道，吸引民眾前往增添人氣。苗栗縣政府與靈洞宮廟方也在這個時期與外界合作，為仙山開拓登山步道，使得本就香客往來絡繹不絕的靈洞宮，又更增添豐沛陽氣。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <figure>
            <img src="/images/mtlogs/014/03.jpg">
        </figure>
        <p>從靈洞宮出發攀登仙山的登山步道主要可分為兩條，一條距離較短，但地勢十分陡峭，需要手腳並用，因有多處攀岩地形，故具備相當挑戰程度；另一條相對安全和緩一些，但距離較長，但說長，其實兩條步道的長度也只相差百餘，分別落在四百九十公尺以及六百三十公尺長度，對經驗豐富的登山者來說都是信步即達的距離。</p>
        <figure>
            <img src="/images/mtlogs/014/04.jpg">
        </figure>
        <p>原本我們預計兩條步道都取，先從較陡的一方上，再從另一側比較和緩的階梯步道下山，至於為什麼會多提「原本」兩字，這裡姑且先賣個關子，待行文至後段會再作出解釋。總而言之，當我們穿過仙洞門，工整筆直的階梯少了，取而代之的是原始山徑以及各種突起的岩稜，地勢也開始轉為扶搖直上。</p>
        <figure>
            <img src="/images/mtlogs/014/05.jpg">
        </figure>
        <figure>
            <img src="/images/mtlogs/014/06.jpg">
        </figure>
        <p>仙山的山頂根據介紹是一塊狹小突出的裸岩，意即是說若要登頂，必須仰賴繩索輔助。我們抬頭愣愣望著登頂前最後必須攀附、幾近垂直的高聳岩角，心想我們雖然也爬過不少這類型的山道了，可是這絕對和「平易親民」應該毫無扯得上邊吧？一路走來除了遇到裝備齊全的山友，也遇到不少懷抱來拜拜、順腳來走走步道的心態，穿著平底的布鞋往上前進的普通民眾，</p>
        

        https://hiking.biji.co/index.php?q=trail&act=detail&id=967
        https://zh.wikipedia.org/zh-tw/%E4%BB%99%E5%B1%B1
        https://www.lingtung.org.tw/about_us.php
        https://www.stan.gov.tw/News_Content.aspx?n=3822&s=139332
        https://www.openbook.org.tw/article/p-67189
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>