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
        <Title :propValue="16" fileType="mountainsLogs" />
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
        <p><span>登山日期：</span><strong>2022-04-15</strong></p>
        <p><span>行走總長：</span><strong>約 2.5 KM</strong></p>
        <p><span>累計耗時：</span><strong>約 1 HR</strong></p>
        <p><span>路程總覽：</span><strong>孚佑宮 → 崁頭山步道 → 石蟾蜍 → 崁頭山</strong></p>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <div class="mtlogs-title" v-text="catalog[0].title"></div>
        <p>當中、低海拔的山區步道越走越多，由內心滋生的某一個想法也越來越強烈──那就是這些山必定標配香火鼎盛的廟宇。其實這在之前遊台中南觀音山一文就曾提過，山在中華文化裡被視為接近天界的地方，是神聖和清靜的象徵，所以許多修仙、修道者，往往會隱入人跡罕至的山中修行，堅定信仰以更親近神明。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <div class="mtlogs-title" v-text="catalog[1].title"></div>
        <p>如果對道教信仰文化有所涉略，看到廟名為孚佑宮，多半已可猜出這座廟主祀哪一尊神明。孚佑所指為孚佑帝君，即「八仙過海」中的呂洞賓，祂同時亦有純陽祖師、呂祖、呂仙公等稱號，所以這座位於台南市東山區崁頭山山腰的孚佑宮，全名又可稱做孚佑宮仙公廟。</p>
        <figure>
            <img src="/images/mtlogs/016/01.jpg">
        </figure>
        <p>二次大戰結束，日本無條件投降，國民政府接收並遷移來台，許多源自華夏地區的民間信仰也跟隨傳播到台灣，加上明清時期就已經陸續來台拓墾的漢人，香火不僅再度獲得延續，還變得更加興盛，信徒們無不積極為各自所信仰的神明分靈至全台地靈人傑之處，諸多神明之中自然也包含呂洞賓。早期主祀呂洞賓的廟宇大多聚集在北台灣，例如起廟日期可追溯自清朝時期的台北木柵指南宮，便是全台五十餘座主祀呂洞賓廟宇裡最具代表性者。</p>
        <p>而崁頭山的孚佑宮，則是在１９４６年時任鄉長匯集地方仕紳協助開通道路，並建立廟宇供奉仙公興香開教。儘管有一派信徒認為，呂仙公早在四百餘年就曾顯化於崁頭山度化眾生，雲遊此地並留有仙跡，先民還為此於當地設祠，祈求孚佑帝君保佑越嶺先民出入平安。無論如何，今日我們所看見的孚佑宮，為西元１９６２年新營一帶有志之士籌倡緣金，於同年興工同年竣工的大廟。</p>
        <figure>
            <img src="/images/mtlogs/016/02.jpg">
        </figure>
        <p>而崁頭山登山步道的起點則坐落在廟宇的後方，路線不長，從孚佑宮出發到山頂環走一圈回到宮殿前停車場僅兩公里左右，步道依山壁而建，全程基本都已鋪裝好石頭階梯與棧道，安全係數極高，相當適合一般民眾輕裝健走，途中所經景點更是吸引許多遊客前來一探究竟。</p>
        <figure>
            <img src="/images/mtlogs/016/03.jpg">
        </figure>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <div class="mtlogs-title" v-text="catalog[2].title"></div>
        <p>崁頭山步道為人樂道者，莫過於孚佑宮流傳的「十二景」，這十二景分別是：石蟾蜍、石寶風洞、明理龍頭穴、白猴洞、石寶八卦圖、去邪風洞穴、石寶金印、入道十門、坤寶爐、石蟹穴、石寶境台、乾寶塔爐。我俯拾階梯而上，不消一會兒，便來到這十二景中最著名的「石蟾蜍」。</p>
        <figure>
            <img src="/images/mtlogs/016/04.jpg">
        </figure>
        <p>從這個角度看過去，再稍加發揮一些聯想力，很快便能意會到石蟾蜍的形貌，宛如一隻蟾蜍將牠的下巴伏靠在步道上。除了石蟾蜍這個名稱外，很多當地人也稱祂為蟾蜍公，根據導覽介紹，說蟾蜍公留有諸多神蹟，若來此一遊，可花些心思探尋其神蹟。</p>
        <p>──說是這樣說，由於缺乏更具體的敘述，我在石蟾蜍周圍來回忖步，始終無法感受到啟發，只得悻悻然作罷。</p>
        <figure>
            <img src="/images/mtlogs/016/05.jpg">
        </figure>
        <p>沿著步道繼續向上迂迴邁進，即將到達頂端腹地之前，一座外觀惹人注目的岩壁矗立在眼簾，不清楚究竟是人為還是渾然天成，其外觀有如蜂窩般坑坑巴巴，十分奇特。湊近一看，不出意外地這塊巨大的岩體同樣位列孚佑宮十二景之一，名叫「乾寶塔爐」。根據描述，乾寶塔爐不單單只是外觀看似寶塔，民間還流傳著每逢晨昏時分，塔爐中便會飄出一縷縷煙霧裊裊而升，遠遠看過去宛如一座真正的寶塔。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <div class="mtlogs-title" v-text="catalog[3].title"></div>
        <p>越過乾寶塔爐，便能登頂崁頭山山頂。崁頭山海拔高度約８４４公尺，看似海拔不高，卻已是台南市第三高峰，前兩座則分別是關子嶺大凍山（１２３６公尺）與竹子尖山（１１１０公尺），也有一說第二高是南化區與嘉義縣大埔鄉交界的三腳南山（１１８６公尺），無論如何，上述這幾座山岳也都在台灣小百岳榜上有名。</p>
        <p>由此可見，台南市境內並沒有很高的高山，向東延伸較深處基本上會進入高雄的行政區域內。</p>
        <figure>
            <img src="/images/mtlogs/016/06.jpg">
        </figure>
        <p>在山頂涼亭旁邊有一條小路，這條小路一直延伸到一塊向懸崖外突出的岩石稜角，這塊石頭便是著名的「情人石」。</p>
        <figure>
            <img src="/images/mtlogs/016/07.jpg">
        </figure>
        <p>行前做功課的時候，知道這塊情人石也是登山網紅拍照打卡的熱門地點，不僅如此，站上情人石還可俯瞰整個嘉南平原，甚至遠眺到濱海地區，只可惜造訪的這日能見度不佳，時間又接近中午，因此可視範圍不怎麼遼闊，只能究竟俯視孚佑宮與鄰近的東山區一帶的部落。</p>
        <figure>
            <img src="/images/mtlogs/016/08.jpg">
        </figure>
        <p>有趣的是，民間素來流傳「情侶不能拜呂洞賓」之說，而這與呂洞賓豐富的情史有關，相傳祂曾先後追求同為八仙的何仙姑，以及佛教的觀世音菩薩，但結果皆以失敗告終。在後代的民學作品亦曾多次描寫呂洞賓的好色，其中尤以〈呂洞賓三戲名妓白牡丹〉最廣為人知，那是一篇講述呂洞賓意欲度化妓女白牡丹，但之後偷雞不著蝕把米的故事。呂洞賓因過往各種失敗經驗而懷恨在心，忌妒全天下熱戀的情侶佳偶，若有情侶攜手前去拜祂，極有可能會被設法拆散。</p>
        <p>當然這個說法被所有主祀呂洞賓的廟宇斥為無稽之談，認為仙公的桃木劍只會斬「爛桃花」，並不會平白無故斷人姻緣，至於那篇源自元代戲曲的〈呂洞賓三戲名妓白牡丹〉，經過近年翻案文章流行的風氣薰陶，也陸續出現一些為呂洞賓平反的論述。</p>
        <p>台北指南宮為了破除情侶不可拜呂洞賓的迷信，甚至在２０１３年舉辦活動，召集一千五百對伴侶，一同登山前往指南風景區新設的景點「情人聖地」，據新聞報導整場活動順利圓滿成功地結束。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <div class="mtlogs-title" v-text="catalog[4].title"></div>
        <p>其實此次登山行程的目標並非只是單純蒐集崁頭山小百岳這一座，原本規劃是想串聯獅額山、坪頂山、劍文山來一個長距離的大縱走，但興許是超過崁頭山登山步道範圍的路線較少人走，因此在我經過岔口，脫離主步道往獅額山方向踏去，短短一兩百公尺便於羊腸小徑上敷了好幾張蜘蛛網面膜，理智線因出自對蜘蛛網的厭惡而斷裂，毅然決定打道回府。</p>
        <p>我對蜘蛛網的恨，恐怕不亞於呂洞賓對情侶佳偶的忌妒，即便後世已經出面為仙公闢謠，我也依然拒絕和擋路的蜘蛛網妥協。</p>
        <figure>
            <img src="/images/mtlogs/016/09.jpg">
        </figure>
        <p>回到崁頭山山頂涼亭，循步道另一個方向下山，結束本日開車比爬山時間還久的登山行程。</p>
        <figure>
            <img src="/images/mtlogs/016/10.jpg">
        </figure>
    </div>
</div>
<!-- end -->
    </BaseTextContent>
</template>