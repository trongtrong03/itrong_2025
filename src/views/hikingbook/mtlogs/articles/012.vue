<script setup lang="ts">
import { reactive } from "vue";
import type { CatalogItem } from '@/stores/catalog';

// 引用組件
import BaseTextContent from '@/components/Common/BaseTextContent.vue';
import Title from "@/components/Common/BaseTextTitle.vue";

// 目錄
const catalog = reactive<CatalogItem[]>([
    { id: 0, title: '序、楔子' },
    { id: 1, title: '壹、橫看成嶺側成峰' },
    { id: 2, title: '貳、大意「吃荊粥」' },
    { id: 3, title: '參、黃金學田' },
]);
</script>

<template>
    <BaseTextContent>
        <Title :propValue="12" fileType="mountainsLogs" />
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
        <p>宋代著名文學家蘇軾離開黃州，前往汝州路上經過廬山時，曾於西林寺的牆壁上寫了一首詩：「橫看成嶺側成峰，遠近高低各不同；不識廬山真面目，只緣身在此山中。」──這首詩便是著名的《題西林壁》。其中，蘇軾利用前兩句詩詞描述盧山的外觀，意指從不同的角度看，山的形狀會有所不同。強調的是視角變化，從正面看像是一條山脊，從側面看則是山峰，遠近的距離也會影響視覺的感受，這些自然現象說明了不同方向投視的視角，映入眼簾的也會呈現出不同的景象。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>居住在大台中地區的我們，儘管此次的目標「大橫屏山」就位於台中太平與南投國姓交界，但若要攀登這一座山並依循大眾路線，我們不得不驅車繞過太平，從南投國姓進入山區。一路曲折蜿蜒，遙望山容橫亙的大橫屏山，還真頗有「橫看成嶺側成峰」之感。大橫屏山作為其山系最高峰，承襲雪山山脈的一條支脈，這條脈絡猶如一道屏障，劃開了台中盆地與南投國姓山區兩地，乃這一帶許多河川的發源地。</p>
        <figure>
            <img src="/images/mtlogs/012/01.jpg">
        </figure>
        <p>只是要前往大橫屏山大眾路線登山口的這段路實在不容易，曲折蜿蜒暫且不說，畢竟十次登山大概八、九次都得先經過山路九彎十八拐的洗禮，方能抵達插有明確標示的登山口。然而這條產業道路不僅遙遠，路幅也十分狹窄，幾乎全程都只能容許一台車輛通行且難以會車，很不像是標榜「平易近人」的小百岳交通應有的四通八達。事實上也確實因為其交通的不便性，大橫屏山在山友蒐集小百岳心得裡，多半將其歸類在較冷門的登山路線之一。</p>
        <figure>
            <img src="/images/mtlogs/012/02.jpg">
        </figure>
        <p>大橫屏山在Ｇｏｏｇｌｅ地圖上沒有明確的登山口標記，我們根據查詢的軌跡紀錄以及前人的經驗建議，導航產業道路上一處名為「碧山農場」的地點，過某個電稈後找一處路邊寬廣的腹地將車輛安置，再改由徒步前往登山口。而當天從我們脫離國姓鬧區進入山路一直到停好車這段過程，完全沒有遇見任何一輛來車，或是和我們有著一樣相同目標的登山客（一直到回程下山才遇到一位獨攀山友），大橫屏山冷門程度可見一斑。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>333</p>
        <figure>
            <img src="/images/mtlogs/012/03.jpg">
        </figure>
    </div>

</div> 
<!-- end -->
    </BaseTextContent>
</template>